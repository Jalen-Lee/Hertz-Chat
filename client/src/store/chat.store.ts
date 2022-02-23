import { makeAutoObservable } from 'mobx'
import { io, Socket } from 'socket.io-client'
import userStore from './user.store'



class ChatStore {

  socket: Socket | undefined

  ws_url:string = process.env.REACT_APP_WS_BASE_URL as string

  constructor() {
    makeAutoObservable(this, {}, {
      autoBind: true,
    })
  }

  private onFirstLoad(payload:any){
    console.group('ws:server.first-load')
    console.log('payload',payload)
    userStore.setConversations(payload.conversations)
    console.groupEnd()
  }

  socketInit() {
    this.socket = io( this.ws_url, { autoConnect: false })
    this.socket.on('connect',()=>{
      console.log('socket 已连接')
    })

    this.socket.on('server.first-load',this.onFirstLoad)


  }

  socketConnect(){
    this.socket!.auth = { uid: userStore.userinfo.uid};
    this.socket?.connect()
  }

  socketDisconnect(){
    this.socket?.disconnect()
  }

  get isSocketConnected(){
    return this.socket?.disconnected
  }
}

export default new ChatStore()
