import { makeAutoObservable } from 'mobx'
import { io, Socket } from 'socket.io-client'
import userStore from './user.store'

class ChatStore {
  socket: Socket | undefined

  ws_url: string = process.env.REACT_APP_WS_BASE_URL as string

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    )
  }

  private onFirstLoad(payload: any) {
    console.group('ws:server.first-load')
    console.log('payload', payload)
    userStore.setConversations(payload.conversations)
    console.groupEnd()
  }

  private onReceiveFriendMsg(payload: any) {
    console.group('ws:收到好友消息')
    console.log('event', 'server.transmit-friend-msg')
    console.log('payload', payload)

    console.groupEnd()
  }

  private onReceiveGroupMsg(payload: any) {
    console.group('ws:收到群聊消息')
    console.log('event', 'server.transmit-group-msg')
    console.log('payload', payload)

    console.groupEnd()
  }

  private onReceiveAddFriendReq(payload: any) {
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
    this.socket = io(this.ws_url, { autoConnect: false })
    this.socket.on('connect', () => {
      console.log('socket 已连接')
    })

    this.socket.on('server.first-load', this.onFirstLoad)
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

  sendGroupMsg(payload: any) {
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

  get isSocketConnected() {
    return this.socket?.disconnected
  }
}

export default new ChatStore()
