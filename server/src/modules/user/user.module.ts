import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import UserService from './user.service'
import UserController from './user.controller'
import JwtStrategy from '../../strategies/jwt.strategy'
import { PassportModule } from '@nestjs/passport'

import { UserAccountEntity } from '../../entities/UserAccount.entity'
import { UserProfileEntity } from '../../entities/UserProfile.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAccountEntity, UserProfileEntity]),
    PassportModule,
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class UsersModule {}
