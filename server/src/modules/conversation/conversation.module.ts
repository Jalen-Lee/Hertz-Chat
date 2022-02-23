import { Module, OnModuleInit } from '@nestjs/common'

import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm'
import JwtStrategy from '../../strategies/jwt.strategy'

import { ConversationService } from './conversation.service'
import { ConversationController } from './conversation.controller'

import { ConversationEntity } from '../../entities/Conversation.entity'
import { UserAccountEntity } from '../../entities/UserAccount.entity'
import { UserProfileEntity } from '../../entities/UserProfile.entity'
import { FriendEntity } from '../../entities/Friend.entity'
import { FriendMessageEntity } from '../../entities/FriendMessage.entity'
import { Repository } from 'typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserAccountEntity,
      UserProfileEntity,
      FriendEntity,
      FriendMessageEntity,
      ConversationEntity,
    ]),
  ],
  providers: [ConversationService, JwtStrategy],
  controllers: [ConversationController],
})
export class ConversationModule implements OnModuleInit {
  constructor(
    @InjectRepository(ConversationEntity)
    private readonly conversationsRepo: Repository<ConversationEntity>,
  ) {}

  onModuleInit(): any {}
}
