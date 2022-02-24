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
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_TABLE, // grace-chat-v1
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
