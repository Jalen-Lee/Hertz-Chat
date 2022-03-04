import { makeAutoObservable } from 'mobx'

class UserStore {
  // 用户信息
  userinfo: IUserinfo | undefined

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

  get uid() {
    return this.userinfo?.uid
  }

  get username() {
    return this.userinfo?.username
  }
}

export default new UserStore()
