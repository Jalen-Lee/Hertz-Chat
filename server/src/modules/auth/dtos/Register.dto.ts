import { ErrorCode } from '../../../common/constants'
import { Length, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class RegisterBodyDto {
  // 用户名，唯一
  @MinLength(2, {
    message: '用户名长度不能少于2个汉字！',
  })
  @MaxLength(8, {
    message: '用户名长度不能多于8个汉字！',
  })
  readonly username: string
  // 密码
  readonly password: string
  // 角色
  readonly role?: string
  // 头像
  readonly avatar?: string
}

export class RegisterResponseDto {
  // 错误码
  readonly code: ErrorCode
  // 用户id
  readonly uid?: string
  // 用户信息
  readonly userInfo?: any
  // 注册完成自动登录之后返回的token信息
  readonly token?: string
  // token过期时间
  readonly tokenExpired?: string
  // 响应信息
  readonly msg: string
}
