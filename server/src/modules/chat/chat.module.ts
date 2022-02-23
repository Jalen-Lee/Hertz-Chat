import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChatGateway } from './chat.gateway'
import { GroupService } from '../group/group.service'

import { UserAccountEntity } from '../../entities/UserAccount.entity'
import { UserProfileEntity } from '../../entities/UserProfile.entity'
import { GroupEntity } from '../../entities/Group.entity'
import { ConversationEntity } from '../../entities/Conversation.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserAccountEntity,
      UserProfileEntity,
      GroupEntity,
      ConversationEntity,
    ]),
  ],
  providers: [ChatGateway, GroupService],
})
export class ChatModule implements OnModuleInit {
  constructor() {}
  async onModuleInit() {
    console.log('chat module初始化')
  }
}
