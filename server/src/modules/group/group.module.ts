import { Module, OnModuleInit } from '@nestjs/common'
import { GroupService } from './group.service'
import { GroupController } from './group.controller'
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm'
import JwtStrategy from '../../strategies/jwt.strategy'

import { UserAccountEntity } from '../../entities/UserAccount.entity'
import { UserProfileEntity } from '../../entities/UserProfile.entity'
import { GroupEntity } from '../../entities/Group.entity'
import { Repository } from 'typeorm'
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
  providers: [GroupService, JwtStrategy],
  controllers: [GroupController],
})
export class GroupModule implements OnModuleInit {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepo: Repository<GroupEntity>,
    @InjectRepository(ConversationEntity)
    private readonly conversationsRepo: Repository<ConversationEntity>,
  ) {}
  async onModuleInit() {
    try {
      const defaultGroup = await this.groupRepo.findOne({
        name: 'Hertz 交流群',
      })
      if (!defaultGroup) {
        const group = this.groupRepo.create({
          name: 'Hertz 交流群',
          owner_id: '000001',
          attendees: [],
          messages: [],
        })
        await this.groupRepo.save(group)
        console.log('Hertz 交流群不存在，已创建')
      } else {
        console.log('Hertz 交流群已存在')
      }
    } catch (err) {
      console.log('group module初始化错误', err)
    }
  }
}
