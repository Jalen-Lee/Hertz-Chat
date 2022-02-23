import { Module } from '@nestjs/common'
import { FriendService } from './friend.service'
import { FriendController } from './friend.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import JwtStrategy from '../../strategies/jwt.strategy'

import { UserAccountEntity } from '../../entities/UserAccount.entity'
import { UserProfileEntity } from '../../entities/UserProfile.entity'
import { FriendEntity } from '../../entities/Friend.entity'
import { FriendMessageEntity } from '../../entities/FriendMessage.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserAccountEntity,
      UserProfileEntity,
      FriendEntity,
      FriendMessageEntity,
    ]),
  ],
  providers: [FriendService, JwtStrategy],
  controllers: [FriendController],
})
export class FriendModule {}
