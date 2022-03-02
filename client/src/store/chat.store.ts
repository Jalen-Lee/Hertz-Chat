import { makeAutoObservable } from 'mobx'
import { io, Socket } from 'socket.io-client'
import { message } from 'antd'
import userStore from './user.store'

interface Friend {
  uid: string
  name: string
  avatar: string
}

interface Group {}

interface Conversation {
  id: string
  name: string
  avatar: string
  hotMsg: string
  postDate: string
  unreadCount: number
  type: ConversationType
  info: any
}

class ChatStore {
  // 当前连接socket实例
  socket: Socket | undefined
  // wss连接url
  wssUrl: string = process.env.REACT_APP_WS_BASE_URL as string
  // 好友列表
  friendsList: any[] = []
  // 群聊列表
  groupsList: any[] = []
  // 会话列表
  conversationsList: Conversation[] = []
  // 群聊消息表
  groupMessagesMap = new Map<string, IGroupMessage[]>()
  // 私聊消息表
  privateMessagesMap = new Map<string, IPrivateMessage[]>()

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    )
  }

  private onInit(payload: any) {
    console.group('ws:server.initialize')
    console.log('payload', payload)
    const { conversations, groups } = payload
    conversations.forEach((i: any) => {
      if (!this.groupMessagesMap.has(i.id)) {
        this.groupMessagesMap.set(i.id, [])
      }
    })
    console.log('messagesMap', this.groupMessagesMap)
    this.setConversationsList(conversations)
    this.setGroupsList(groups)
    console.groupEnd()
  }

  private onReceiveFriendMsg(payload: {
    msgId: string
    friendId: string
    msgType: MessageType
    content: string
  }) {
    console.group('ws:收到好友消息')
    console.log('event', 'server.receive-friend-msg')
    console.log('payload', payload)

    console.groupEnd()
  }

  private onReceiveGroupMsg(payload: IGroupMessage) {
    console.group('ws:收到群聊消息')
    console.log('event', 'server.receive-group-msg')
    console.log('payload', payload)
    this.setGroupMessagesMap(payload.groupId, {
      id: payload.id,
      groupId: payload.groupId,
      senderInfo: payload.senderInfo,
      messageType: payload.messageType,
      content: payload.content,
    })
    console.groupEnd()
  }

  private onReceiveAddFriendReq(payload: {
    reqId: string
    senderInfo: { uid: string; name: string; avatar: string }
  }) {
    console.group('ws:收到添加好友请求')
    console.log('event', 'server.transmit-add-friend-req')
    console.log('payload', payload)

    console.groupEnd()
  }

  private onReceiveAddFriendRes(payload: any) {
    console.group('ws:收到添加好友请求回复')
    console.log('event', 'server.transmit-add-friend-res')
    console.log('payload', payload)

    console.groupEnd()
  }

  socketInit() {
    this.socket = io(this.wssUrl, { autoConnect: false })
    this.socket.on('connect', () => {
      message.success('WebSocket已连接')
    })

    this.socket.on('server.initialize', this.onInit)
    this.socket.on('server.receive-friend-msg', this.onReceiveFriendMsg)
    this.socket.on('server.receive-group-msg', this.onReceiveGroupMsg)
    this.socket.on('server.receive-add-friend-req', this.onReceiveAddFriendReq)
    this.socket.on('server.receive-add-friend-res', this.onReceiveAddFriendRes)
  }

  socketConnect() {
    this.socket!.auth = { uid: userStore.userinfo.uid }
    this.socket?.connect()
  }

  socketDisconnect() {
    this.socket?.disconnect()
  }

  sendFriendMsg(payload: any) {
    console.group('ws:发送好友消息')
    console.log('event', 'client.send-friend-msg')
    console.log('payload', payload)
    this.socket?.emit('client.send-friend-msg', payload)
    console.groupEnd()
  }

  sendGroupMessage(payload: any) {
    console.group('ws:发送群聊消息')
    console.log('event', 'client.send-group-msg')
    console.log('payload', payload)
    this.socket?.emit('client.send-group-msg', payload)
    console.groupEnd()
  }

  sendAddFriendReq(payload: any) {
    console.group('ws:发送添加好友请求')
    console.log('event', 'client.send-add-friend-req')
    console.log('payload', payload)
    this.socket?.emit('client.send-add-friend-req', payload)
    console.groupEnd()
  }

  sendJoinGroupReq(payload: any) {
    console.group('ws:发送加入群聊请求')
    console.log('event', 'client.send-join-group-req')
    console.log('payload', payload)
    this.socket?.emit('client.send-join-group-req', payload)
    console.groupEnd()
  }

  setConversationsList(data: any[]) {
    this.conversationsList = data
  }

  setGroupsList(data: any[]) {
    this.groupsList = data
  }

  /**
   * 更新群聊消息表
   * @param groupId 群聊id
   * @param message 消息
   */
  setGroupMessagesMap(groupId: string, message: IGroupMessage) {
    const messagesList = this.groupMessagesMap.get(groupId)
    this.groupMessagesMap.set(groupId, [...messagesList!, message])
  }

  /**
   * 更新私聊消息表
   * @param friendId 好友id
   * @param message 消息
   */
  setPrivateMessagesMap(friendId: string, message: IPrivateMessage) {
    const messagesList = this.privateMessagesMap.get(friendId)
    this.privateMessagesMap.set(friendId, [...messagesList!, message])
  }

  get isSocketConnected() {
    return this.socket?.disconnected
  }

  get socketId() {
    return this.socket?.id
  }
}

export default new ChatStore()
