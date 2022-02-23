import { ErrorCode } from '../../../common/constants'

export class CheckTokenBodyDto {
  readonly token: string
}

export class CheckTokenResponseDto {
  // 错误码
  readonly code: ErrorCode
  // 用户Id
  readonly uid?: string
  // 用户信息
  readonly userInfo?: any
  // 响应信息
  readonly msg: string
  // token
  readonly token?: string
  // token过期时间
  readonly tokenExpired?: Date
}
