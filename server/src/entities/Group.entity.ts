import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm'
import { GroupMessageEntity } from './GroupMessage.entity'
import { UserProfileEntity } from './UserProfile.entity'

@Entity({
  name: 'group',
})
export class GroupEntity {
  // 群聊id
  @PrimaryGeneratedColumn('uuid')
  id: string

  // 群聊名称
  @Column()
  name: string

  // 群聊头像
  @Column({
    default:
      'https://portrait.gitee.com/uploads/avatars/namespace/616/1850091_oimchat_1578991198.png!avatar100',
  })
  icon: string

  // 群聊描述
  @Column({ default: '群主很懒，啥也没写~' })
  description: string

  // 群主id
  @Column()
  owner_id: string

  // 创建时间
  @CreateDateColumn()
  create_date: Date

  // 群聊消息列表
  @OneToMany(() => GroupMessageEntity, (messages) => messages.group)
  messages: GroupMessageEntity[]

  // 群成员
  @ManyToMany(() => UserProfileEntity, (profile) => profile.groups)
  attendees: UserProfileEntity[]
}
