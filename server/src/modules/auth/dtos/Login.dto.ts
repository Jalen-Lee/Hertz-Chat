import { ErrorCode } from '../../../common/constants'

export type LoginBodyDto = {
  // 用户名
  username: string
  // 密码
  password: string
}

export type LoginResponseDto = {
  // 错误码
  code: ErrorCode
  // 用户id
  uid?: string
  // 用户信息
  userInfo?: any
  // 响应信息
  msg: string
  // 登录成功之后返回的token信息
  token?: string
  // token过期时间
  tokenExpired?: string
}
