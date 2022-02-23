import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm'
import { GroupEntity } from './Group.entity'

interface senderInfo {
  uid: string
  username: string
  avatar: string
  gender: string
}

@Entity({
  name: 'group_message',
})
export class GroupMessageEntity {
  // 群消息id
  @PrimaryGeneratedColumn('uuid')
  id: string

  // 发送人profile id
  @Column()
  sender_id: string

  // 消息类型
  @Column()
  type: 'text' | 'image' | 'file' | 'video' | 'audio'

  // 消息内容
  @Column()
  content: string

  // 发布时间
  @CreateDateColumn()
  publish_date: Date

  @ManyToOne(() => GroupEntity, (group) => group.messages)
  group: GroupEntity
}
