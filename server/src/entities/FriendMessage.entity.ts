import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm'
import { UserProfileEntity } from './UserProfile.entity'

@Entity('friend_message')
export class FriendMessageEntity {
  // 消息数据库id
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  sender_id: string

  @OneToOne(() => UserProfileEntity)
  @JoinColumn({ name: 'sender_profile_id' })
  sender_profile: UserProfileEntity

  @Column()
  receiver_id: string

  @OneToOne(() => UserProfileEntity)
  @JoinColumn({ name: 'receiver_profile_id' })
  receiver_profile: UserProfileEntity

  @CreateDateColumn()
  create_at: Date
}
