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
import { QiniuService } from '../qiniu/qiniu.service'

interface Friend {
  id: string
  name: string
  avatar: string
  info: any
}

interface Group {
  id: string
  name: string
  avatar: string
  info: any
}

@WebSocketGateway({
  namespace: 'hertz-ws-qa',
  // 跨域
  cors: {
    credentials: false,
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server

  connectionsMap = new Map<string, any>()
  connectionsSet = new Set<any>()

  constructor(
    @InjectRepository(UserProfileEntity)
    private profileRepo: Repository<UserProfileEntity>,
    @InjectRepository(UserAccountEntity)
    private accountRepo: Repository<UserAccountEntity>,
    @InjectRepository(GroupEntity)
    private groupRepo: Repository<GroupEntity>,
    private readonly groupService: GroupService,
    private readonly qiniuService: QiniuService,
  ) {}

  afterInit(server: Server) {
    // console.log('webSocket网关初始化', server)
    server.use((socket, next) => {
      next()
    })
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const { uid, userInfo } = client.handshake.auth
    this.connectionsMap.set(client.id, userInfo)
    this.connectionsSet.add(userInfo)
    console.log(`客户端${client.id}已连接,uid:${uid}`, userInfo)
    console.log('当前在线人数：', this.connectionsSet.size)
    // 用户加入自己的房间
    client.join(uid)
    const uploadToken = await this.qiniuService.createUploadToken()
    client.emit('server.initialize', {
      conversations: [
        {
          id: 'ljlyyds',
          name: 'Hertz 交流群',
          avatar:
            'https://pic2.zhimg.com/v2-1c3009805f50abe7950bca70c0c5b34c_l.jpg?source=32738c0c',
          hotMsg: '',
          postDate: '',
          unreadCount: 0,
          type: 'group',
          info: {},
        },
        ...[...this.connectionsSet]
          .filter((i) => i.uid !== uid)
          .map((i) => ({
            id: i.uid,
            name: i.username,
            avatar: i.avatar,
            hotMsg: '',
            postDate: '',
            unreadCount: 0,
            type: 'private',
            info: i,
          })),
      ],
      friends: [
        ...[...this.connectionsSet]
          .filter((i) => i.uid !== uid)
          .map((i) => ({
            id: i.uid,
            name: i.username,
            avatar: i.avatar,
            info: i,
          })),
      ],
      groups: [
        {
          id: 'ljlyyds',
          name: 'Hertz 交流群',
          avatar:
            'https://pic2.zhimg.com/v2-1c3009805f50abe7950bca70c0c5b34c_l.jpg?source=32738c0c',
          info: {},
        },
      ],
      uploadToken,
    })
    // let profile = await this.profileRepo.findOne(uid, {
    //   relations: ['groups'],
    // })
    //
    // const defaultGroup = await this.groupRepo.findOne({
    //   name: 'Hertz 交流群',
    // })
    //
    // if (
    //   profile &&
    //   profile.groups.findIndex((i) => i.name === defaultGroup.name) === -1
    // ) {
    //   console.log('用户没有加入Hertz 交流群')
    //   profile.groups.push(defaultGroup)
    //   profile = await this.profileRepo.save(profile)
    //   defaultGroup.attendees.push(profile)
    //   await this.groupRepo.save(defaultGroup)
    //   console.log('用户当前已加入Hertz 交流群')
    // } else {
    //   console.log('用户已经加入Hertz 交流群')
    // }
    //
    // // 用户加入群聊
    // for (const group of profile.groups) {
    //   client.join(group.id)
    // }
    // // console.log('用户已加入所有群聊房间')
    // // 加入自己的房间
    // client.join(uid)
    // // console.log('用户加入自己的房间')
    //
    // const { data } = await this.groupService.getUserGroups(uid)
    // const uploadToken = await this.qiniuService.createUploadToken()
    // client.emit('server.initialize', {
    //   conversations: data.map((i) => ({
    //     id: i.id,
    //     name: i.name,
    //     avatar: i.icon,
    //     hotMsg: '',
    //     postDate: '',
    //     unreadCount: 0,
    //     type: 'group',
    //     info: i,
    //   })),
    //   groups: data,
    //   uploadToken,
    // })
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const userInfo = this.connectionsMap.get(client.id)
    this.connectionsSet.delete(userInfo)
    this.connectionsMap.delete(client.id)
    const rooms = [...this.connectionsSet].map((i) => i.uid)
    client.to(rooms).emit('server.user-disconnected', {
      conversations: [...this.connectionsSet].map((i) => ({
        id: i.uid,
        name: i.username,
        avatar: i.avatar,
        hotMsg: '',
        postDate: '',
        unreadCount: 0,
        type: 'private',
        info: i,
      })),
    })
    console.log('rooms', rooms)
    console.log(`客户端${client.id}已断开连接`)
    console.log(`当前在线人数：${this.connectionsSet.size}`)
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
