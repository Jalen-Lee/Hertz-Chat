import { join } from 'path'
import { registerAs } from '@nestjs/config'
import { UserAccountEntity } from '../entities/UserAccount.entity'
import { UserProfileEntity } from '../entities/UserProfile.entity'
import { GroupEntity } from '../entities/Group.entity'
import { GroupMessageEntity } from '../entities/GroupMessage.entity'
import { FriendEntity } from '../entities/Friend.entity'
import { FriendMessageEntity } from '../entities/FriendMessage.entity'
import { ConversationEntity } from '../entities/Conversation.entity'

export default registerAs('database', () => ({
  type: 'mysql',
  host: '101.35.4.147',
  port: 3306,
  username: 'root',
  password: 'ljlyyds123',
  database: 'hertz-qa', // grace-chat-v1
  entities: [
    UserAccountEntity,
    UserProfileEntity,
    GroupEntity,
    GroupMessageEntity,
    FriendMessageEntity,
    FriendEntity,
    ConversationEntity,
  ],
  synchronize: true,
}))
