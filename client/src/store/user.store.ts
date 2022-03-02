import { makeAutoObservable } from 'mobx'

interface IUserinfo {
  uid: string
  username: string
  avatar: string
  gender: number
  email: string
  description: string
}

class UserStore {
  // 用户信息
  userinfo: any

  // 会话列表
  conversations: any[] = []

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    )
  }

  setUserinfo(data: any) {}

  setConversations(conversations: any[]) {
    this.conversations = conversations
  }
}

export default new UserStore()
