import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ErrorCode } from '../../common/constants'

import { UserProfileEntity } from '../../entities/UserProfile.entity'
import { UserAccountEntity } from '../../entities/UserAccount.entity'

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(UserProfileEntity)
    private profileRepo: Repository<UserProfileEntity>,
    @InjectRepository(UserAccountEntity)
    private accountRepo: Repository<UserAccountEntity>,
  ) {}

  /**
   * 获取用户信息
   * @param uid
   */
  async getProfile(uid: string): Promise<any> {
    try {
      console.log('获取用户信息', uid)
      const profile = await this.profileRepo.findOne(uid)
      return {
        code: ErrorCode.SUCCESS,
        data: {
          uid: profile.id,
          username: profile.username,
          avatar: profile.avatar,
          gender: profile.gender,
          email: profile.email,
          description: profile.description,
          err_msg: '获取用户信息成功',
        },
      }
    } catch (err) {
      console.log('获取用户信息错误', err)
      return {
        code: ErrorCode.UNKNOWN_ERROR,
        err_msg: err.toString(),
      }
    }
  }

  /**
   * 修改用户信息
   * @param payload
   */
  async updateProfile(payload: any): Promise<any> {
    try {
      console.log('修改用户信息请求', payload)
      const { uid, data } = payload
      const profile = await this.profileRepo.findOne(uid)

      for (const i in data) {
        if (profile.hasOwnProperty(i)) {
          profile[i] = data[i]
        }
      }

      const newProfile = await this.profileRepo.save(profile)

      return {
        code: ErrorCode.SUCCESS,
        data: {
          ...newProfile,
          err_msg: '修改用户信息成功',
        },
      }
    } catch (err) {
      console.log('修改用户信息错误', err)
      return {
        code: ErrorCode.UNKNOWN_ERROR,
        err_msg: err.toString(),
      }
    }
  }
}
