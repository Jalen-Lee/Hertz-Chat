import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ErrorCode } from '../../common/constants'

import { UserProfileEntity } from '../../entities/UserProfile.entity'
import { UserAccountEntity } from '../../entities/UserAccount.entity'
import { GroupEntity } from '../../entities/Group.entity'

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(UserProfileEntity)
    private profileRepo: Repository<UserProfileEntity>,
    @InjectRepository(UserAccountEntity)
    private accountRepo: Repository<UserAccountEntity>,
    @InjectRepository(GroupEntity)
    private groupRepo: Repository<GroupEntity>,
  ) {}

  /**
   * 创建群聊
   * @param payload
   */
  async createGroup(payload: any): Promise<any> {
    try {
      const { uid, name } = payload
      const profile = await this.profileRepo.findOne(uid, {
        relations: ['groups'],
      })

      console.log(profile)

      const group = this.groupRepo.create({
        name,
        owner_id: uid,
      })
      profile.groups.push(group)
      group.attendees = [profile]

      const groupRecord = await this.groupRepo.save(group)
      const profileRecord = await this.profileRepo.save(profile)
      console.log('groupRecord', groupRecord)
      console.log('profileRecord', profileRecord)
      return {
        code: ErrorCode.SUCCESS,
        data: {
          group_id: groupRecord.id,
          name: groupRecord.name,
          owner_id: groupRecord.owner_id,
          icon: groupRecord.icon,
          description: groupRecord.description,
          create_date: groupRecord.create_date,
        },
        err_msg: '创建群聊成功',
      }
    } catch (err) {
      console.log('创建群聊错误', err)
      return {
        code: ErrorCode.UNKNOWN_ERROR,
        err_msg: err.toString(),
      }
    }
  }

  /**
   * 获取群聊的所有成员
   * @param groupId
   */
  async getAttendees(groupId: string): Promise<any> {
    try {
      const groupRecord = await this.groupRepo.findOne(groupId, {
        relations: ['attendees'],
      })

      const attendees = groupRecord.attendees

      return {
        code: ErrorCode.SUCCESS,
        data: [...attendees],
        err_msg: '获取群成员成功',
      }
    } catch (err) {}
  }

  /**
   * 获取用户所有群聊
   * @param uid
   */
  async getUserGroups(uid: string): Promise<any> {
    try {
      const profile = await this.profileRepo.findOne(uid, {
        relations: ['groups'],
      })
      if (!profile) {
        return Promise.reject(new Error('获取用户所有群聊错误，用户不存在！'))
      } else {
        const groups = profile.groups.map((group) => ({
          ...group,
          type: 'group',
        }))
        return Promise.resolve({
          data: groups,
        })
      }
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
