import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { jwtConstants } from '../modules/auth/constants'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserAccountEntity } from '../entities/UserAccount.entity'
import { compareHash, genHash } from '../utils/hash'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserAccountEntity)
    private readonly accountRepo: Repository<UserAccountEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }

  async validate(payload: any): Promise<any> {
    console.group('jwt策略', payload)

    const { account, password } = payload
    const accountRecord = await this.accountRepo.findOne({
      select: ['id', 'password'],
      relations: ['profile'],
      where: {
        account,
      },
    })
    if (!accountRecord) {
      console.log('account记录不存在', accountRecord)
      console.groupEnd()
      throw new UnauthorizedException(
        {
          code: 401,
          err_msg: '用户不存在！',
        },
        '用户不存在！',
      )
    }
    if (!(await compareHash(password, accountRecord.password))) {
      console.log('数据库密码与token密码不一致')
      console.groupEnd()
      throw new UnauthorizedException(
        {
          code: 401,
          err_msg: '数据库密码与token密码不一致！',
        },
        '数据库密码与token密码不一致！',
      )
    }
    console.log('jwt检验成功')
    console.groupEnd()
    return accountRecord.profile
  }
}
