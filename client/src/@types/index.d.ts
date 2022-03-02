type MessageType = 'text' | 'file'
type ConversationType = 'private' | 'group'

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
}
