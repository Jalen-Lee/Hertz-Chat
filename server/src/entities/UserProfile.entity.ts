import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Unique,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { UserAccountEntity } from './UserAccount.entity'
import { GroupEntity } from './Group.entity'
import { FriendEntity } from "./Friend.entity";
import { ConversationEntity } from "./Conversation.entity";

enum GENDER {
  MALE = 0,
  FEMALE = 1,
  NULL = 2,
}

const globalPrefix = 'http://localhost:9527/static/avatar/'
const avatars = [
  `${globalPrefix}avatar-1.png`,
  `${globalPrefix}avatar-2.png`,
  `${globalPrefix}avatar-3.png`,
  `${globalPrefix}avatar-4.png`,
  `${globalPrefix}avatar-5.png`,
  `${globalPrefix}avatar-6.png`,
  `${globalPrefix}avatar-7.png`,
  `${globalPrefix}avatar-8.png`,
  `${globalPrefix}avatar-9.png`,
  `${globalPrefix}avatar-10.png`,
  `${globalPrefix}avatar-11.png`,
  `${globalPrefix}avatar-12.png`,
]

function randomAvatar() {
  const index = parseInt(String(Math.random() * 12), 10)
  return avatars[index]
}

@Entity({
  name: 'profile',
})
export class UserProfileEntity {
  // 数据库id
  @PrimaryGeneratedColumn('uuid')
  id: string

  // 用户名
  @Column()
  username: string

  // 头像
  @Column({
    default:
      'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  })
  avatar: string

  // 个性签名
  @Column({ default: '这个人很懒，啥也没写~' })
  description: string

  // 邮箱
  @Column()
  email: string

  // 性别
  @Column({ default: GENDER.NULL })
  gender: GENDER

  @OneToOne(() => UserAccountEntity, (account) => account.profile)
  account: UserAccountEntity

  @ManyToMany(() => GroupEntity, (groups) => groups.attendees, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'profile_with_groups',
    joinColumn: {
      name: 'profile_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
  })
  groups: GroupEntity[]
}
