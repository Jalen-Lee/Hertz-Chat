import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import databaseConfig from './configs/database.config'

// 业务模块
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/user/user.module'
import { ChatModule } from './modules/chat/chat.module'
import { GroupModule } from './modules/group/group.module'
import { FriendModule } from './modules/friend/friend.module'
import { ConversationModule } from './modules/conversation/conversation.module'

@Module({
  imports: [
    // config模块
    ConfigModule.forRoot({
      // 禁止加载环境变量
      ignoreEnvFile: true,
      // 全局使用
      isGlobal: true,
      // 自定义配置文件
      load: [databaseConfig],
    }),
    // typeorm模块
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    // 用户模块
    UsersModule,
    // 权限模块
    AuthModule,
    // websocket网关模块
    ChatModule,
    // 群聊模块
    GroupModule,
    // 好友模块
    FriendModule,
    // 回话模块
    ConversationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
