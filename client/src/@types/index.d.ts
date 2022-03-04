interface IUserinfo {
  uid: string
  username: string
  avatar?: string
  gender?: number
  email?: string
  description?: string
}

type MessageType = 'text' | 'file'
type ConversationType = 'private' | 'group'

interface IConversation {
  id: string
  name: string
  avatar: string
  hotMsg: string
  postDate: string
  unreadCount: number
  type: ConversationType
  info: any
}

interface IPrivateMessage {
  name: string
  [key: string]: any
}

interface IGroupMessage {
  id: string
  groupId: string
  senderInfo: any
  messageType: MessageType
  content: string
  postDate: Date
}
