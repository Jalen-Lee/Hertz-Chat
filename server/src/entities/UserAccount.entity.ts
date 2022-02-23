import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  Unique,
} from 'typeorm'

import { UserProfileEntity } from './UserProfile.entity'

enum Role {
  USER = 0,
  ADMIN = 1,
}

@Entity({
  name: 'account',
})
@Unique(['account'])
export class UserAccountEntity {
  // 数据库id
  @PrimaryGeneratedColumn('uuid')
  id: string

  // 账号，邮箱或手机号
  @Column()
  account: string

  // 密码
  @Column({ select: true })
  password: string

  // 创建时间
  @CreateDateColumn()
  created_date: Date

  // 角色
  @Column({ default: Role.USER })
  role: Role

  // 个人信息
  @OneToOne(() => UserProfileEntity, (profile) => profile.account, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'profile_id',
  })
  profile: UserProfileEntity
}
