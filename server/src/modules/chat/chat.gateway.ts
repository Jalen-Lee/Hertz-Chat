import {
  ConnectedSocket,
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { nanoid } from 'nanoid'

import { Server, Socket } from 'socket.io'
import { UserProfileEntity } from '../../entities/UserProfile.entity'
import { UserAccountEntity } from '../../entities/UserAccount.entity'
import { GroupEntity } from '../../entities/Group.entity'
import { GroupService } from '../group/group.service'
import any = jasmine.any

@WebSocketGateway({
  namespace: 'hertz-ws-qa',
  // socket.io跨越
  cors: {
    credentials: false,
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server

  constructor(
    @InjectRepository(UserProfileEntity)
    private profileRepo: Repository<UserProfileEntity>,
    @InjectRepository(UserAccountEntity)
    private accountRepo: Repository<UserAccountEntity>,
    @InjectRepository(GroupEntity)
    private groupRepo: Repository<GroupEntity>,
    private readonly groupService: GroupService,
  ) {}

  afterInit(server: Server) {
    // console.log('webSocket网关初始化', server)
    server.use((socket, next) => {
      next()
    })
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const { uid } = client.handshake.auth
    console.log(`客户端${client.id}已连接,uid:${uid}`)
    let profile = await this.profileRepo.findOne(uid, {
      relations: ['groups'],
    })

    const defaultGroup = await this.groupRepo.findOne({
      name: 'Hertz 交流群',
    })

    if (
      profile &&
      profile.groups.findIndex((i) => i.name === defaultGroup.name) === -1
    ) {
      console.log('用户没有加入Hertz 交流群')
      profile.groups.push(defaultGroup)
      profile = await this.profileRepo.save(profile)
      defaultGroup.attendees.push(profile)
      await this.groupRepo.save(defaultGroup)
      console.log('用户当前已加入Hertz 交流群')
    } else {
      console.log('用户已经加入Hertz 交流群')
    }

    // 用户加入群聊
    for (const group of profile.groups) {
      client.join(group.id)
    }
    console.log('用户已加入所有群聊房间')
    // 加入自己的房间
    client.join(uid)
    console.log('用户加入自己的房间')

    const { data } = await this.groupService.getUserGroups(uid)
    console.log('groups data', data)
    client.emit('server.initialize', {
      conversations: data.map((i) => ({
        id: i.id,
        name: i.name,
        avatar: i.icon,
        hotMsg: '',
        postDate: '',
        unreadCount: 0,
        type: 'group',
        info: i,
      })),
      groups: data,
    })
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`客户端${client.id}已断开连接`)
  }

  /**
   * 客户端发送好友消息
   * @param data
   * @param client
   */
  @SubscribeMessage('client.send-friend-msg')
  handleClientSendFriendMsg(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): void {
    const { from, to, type, content } = data
    client.to(to).emit('server.receive-friend-msg', {
      from,
      type,
      content,
    })
  }

  /**
   * 客户端发送群聊消息
   * @param data
   * @param client
   */
  @SubscribeMessage('client.send-group-msg')
  handleClientSendGroupMsg(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): any {
    const { groupId, senderInfo, messageType, content, postDate } = data
    console.log('client.send-group-msg', data)
    const message = {
      id: nanoid(),
      groupId,
      senderInfo,
      messageType,
      content,
      postDate,
    }
    client.broadcast.to(groupId).emit('server.receive-group-msg', message)
    return {
      code: 0,
      message,
    }
  }

  /**
   * 客户端发送添加好友请求
   * @param data
   * @param client
   */
  @SubscribeMessage('client.send-add-friend-req')
  handleClientSendAddFriendReq(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): void {
    const { from, to } = data
  }

  /**
   * 客户端发送加入群聊请求
   * @param data
   * @param client
   */
  @SubscribeMessage('client.send-join-group-req')
  handleClientSendJoinGroupReq(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    return data
  }
}
