import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import AuthService from '../modules/auth/auth.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserAccountEntity } from '../entities/UserAccount.entity'
import { compareHash } from '../utils/hash'

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserAccountEntity)
    private readonly accountRepo: Repository<UserAccountEntity>,
    private readonly authService: AuthService,
  ) {
    super({
      usernameField: 'account',
      passwordField: 'password',
    })
  }

  async validate(account: string, password: string): Promise<any> {
    console.group('本地策略验证', account, password)

    const accountRecord = await this.accountRepo.findOne(
      {
        account,
      },
      {
        select: ['id', 'password'],
        relations: ['profile'],
      },
    )

    console.log('数据库账号记录', accountRecord)

    if (!accountRecord) {
      console.log('用户不存在')
      throw new UnauthorizedException(
        {
          code: 401,
          msg: '登录失败，用户不存在！',
        },
        '用户不存在',
      )
    }
    if (await compareHash(password, accountRecord.password)) {
      console.log('密码校验成功')
      console.groupEnd()
      return accountRecord.profile
    } else {
      console.log('密码校验失败')
      console.groupEnd()
      throw new UnauthorizedException(
        {
          code: 401,
          msg: '登录失败，账号密码错误！',
        },
        '账号密码错误',
      )
    }
  }
}
