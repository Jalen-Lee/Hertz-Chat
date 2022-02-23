import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserAccountEntity } from '../../entities/UserAccount.entity'
import { UserProfileEntity } from '../../entities/UserProfile.entity'
import { GroupEntity } from '../../entities/Group.entity'
import { GroupMessageEntity } from '../../entities/GroupMessage.entity'

import * as ms from 'ms'
import {
  CheckTokenResponseDto,
  LoginBodyDto,
  LoginResponseDto,
  RegisterBodyDto,
  RegisterResponseDto,
} from './dtos'

import { genHash } from '../../utils/hash'
import { ErrorCode } from '../../common/constants'

@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(UserAccountEntity)
    private readonly accountRepo: Repository<UserAccountEntity>,
    @InjectRepository(UserProfileEntity)
    private readonly profileRepo: Repository<UserProfileEntity>,
    @InjectRepository(GroupEntity)
    private readonly groupRepo: Repository<GroupEntity>,
    @InjectRepository(GroupMessageEntity)
    private readonly groupMessageRepo: Repository<GroupMessageEntity>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 用户登录
   * @param profile
   * @param {LoginBodyDto} payload 用户登录的表单信息
   */
  async login(profile: any, payload: any): Promise<any> {
    try {
      console.log('登录请求', payload)
      const { account, password } = payload
      const nowTime = Date.now()
      return {
        code: ErrorCode.SUCCESS,
        data: {
          userinfo: {
            uid: profile.id,
            username: profile.username,
            avatar: profile.avatar,
            gender: profile.gender,
            email: profile.email,
            description: profile.description,
          },
          token: this.jwtService.sign({
            iat: nowTime,
            account,
            password,
            sub: profile.id,
          }),
          tokenExpired: nowTime + ms('3 days'),
        },
        err_msg: '账号登录成功',
      }
    } catch (err) {
      console.log('登陆请求错误', err)
      return {
        code: ErrorCode.UNKNOWN_ERROR,
        err_msg: err.toString(),
      }
    }
  }

  /**
   * 用户注册
   * @param {RegisterBodyDto} payload 用户登录的表单信息
   */
  async signup(payload: any): Promise<any> {
    try {
      console.log('注册请求', payload)
      const { account, username, password } = payload
      const newAccount = this.accountRepo.create({
        account,
        password: await genHash(password),
      })
      const newProfile = this.profileRepo.create({
        username,
        email: account,
        groups: [],
      })

      newProfile.account = newAccount
      newAccount.profile = newProfile

      const profile = await this.profileRepo.save(newProfile)
      const _account = await this.accountRepo.save(newAccount)

      const nowTime = Date.now()
      return {
        code: ErrorCode.SUCCESS,
        data: {
          userinfo: {
            uid: profile.id,
            username: profile.username,
            avatar: profile.avatar,
            gender: profile.gender,
            email: profile.email,
            description: profile.description,
          },
          token: this.jwtService.sign({
            iat: nowTime,
            account,
            password,
            sub: profile.id,
          }),
          tokenExpired: nowTime + ms('3 days'),
        },
        err_msg: '账号注册成功',
      }
    } catch (err) {
      console.log('账号注册错误', err)
      return {
        code: ErrorCode.UNKNOWN_ERROR,
        err_msg: err.toString(),
      }
    }
  }

  /**
   * Token校验
   * @param {string} token 用户Token
   */
  async checkToken(payload: any): Promise<any> {
    try {
      console.log('token校验请求', payload)
      const { token } = payload
      const tokenPayload = await this.jwtService.verifyAsync(token)
      console.log('token负载', payload)
      if (tokenPayload) {
        const { profile } = await this.accountRepo.findOne({
          relations: ['profile'],
          where: { account: tokenPayload.account },
        })

        return {
          code: 0,
          data: {
            userinfo: {
              uid: profile.id,
              username: profile.username,
              avatar: profile.avatar,
              gender: profile.gender,
              email: profile.email,
              description: profile.description,
            },
          },
          err_msg: 'token校验成功',
        }
      } else {
        return {
          code: ErrorCode.ACCESS_TOKEN_EXPIRED,
          err_msg: 'Token校验失败!',
        }
      }
    } catch (err) {
      return {
        code: ErrorCode.UNKNOWN_ERROR,
        err_msg: err.toString(),
      }
    }
  }
}
