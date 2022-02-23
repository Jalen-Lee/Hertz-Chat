import { makeAutoObservable } from 'mobx'

class UserStore{

  // 用户信息
  userinfo:any

  // 会话列表
  conversations:any[] = []

  // 好友列表
  friendsList: any[] = []
  // 群聊列表
  groupsList: any[] = []


  constructor() {
    makeAutoObservable(this,{},{
      autoBind:true
    })
  }

  setConversations(conversations:any[]){
    this.conversations = conversations
  }

  setFriendsList(friendsList:any[]){
    this.friendsList = friendsList
  }

  setGroupsList(groupsList:any[]){
    this.groupsList = groupsList
  }
}

export default new UserStore()
