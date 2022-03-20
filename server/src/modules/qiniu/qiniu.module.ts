import { Module } from '@nestjs/common'
import JwtStrategy from '../../strategies/jwt.strategy'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'

import { QiniuController } from './qiniu.controller'
import { QiniuService } from './qiniu.service'

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [QiniuService],
  controllers: [QiniuController],
})
export class QiniuModule {}
