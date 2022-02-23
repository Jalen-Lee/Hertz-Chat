import { Module } from '@nestjs/common'
import AuthController from './auth.controller'
import AuthService from './auth.service'
import { jwtConstants } from './constants'
import LocalStrategy from '../../strategies/local.strategy'
import JwtStrategy from '../../strategies/jwt.strategy'

import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'

import { UserAccountEntity } from '../../entities/UserAccount.entity'
import { UserProfileEntity } from '../../entities/UserProfile.entity'
import { GroupEntity } from '../../entities/Group.entity'
import { GroupMessageEntity } from '../../entities/GroupMessage.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserAccountEntity,
      UserProfileEntity,
      GroupEntity,
      GroupMessageEntity,
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3 days' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
