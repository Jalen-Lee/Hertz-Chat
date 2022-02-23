import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm'
import { UserProfileEntity } from './UserProfile.entity'

@Entity('conversation')
export class ConversationEntity {
  // 好友数据库id
  @PrimaryGeneratedColumn('uuid')
  id: string

  // 该会话属于谁
  @Column()
  uid: string

  // 会话对方的id
  @Column()
  peer_id: string

  // 会话类型，群聊还是私人
  @Column()
  type: 'group' | 'private'

  @Column()
  name: string

  @Column()
  avatar: string

  @Column({
    default: '',
  })
  hot_msg: string

  @UpdateDateColumn()
  last_update_at: Date
}
