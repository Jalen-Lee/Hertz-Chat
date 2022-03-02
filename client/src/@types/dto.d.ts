export enum ErrorCode {
  // 成功
  SUCCESS = 0,
  // 未知错误
  UNKNOWN_ERROR = 1,
  // 服务暂不可用
  SERVICE_TEMPORARILY_UNAVAILABLE = 3,
  // 请求参数无效
  INVALID_PARAMETER = 100,
  // api key无效
  INVALID_API_KEY = 101,
  // 无效的用户资料字段名
  INVALID_USER_INFO_FIELD = 109,
  // 无效的access token
  ACCESS_TOKEN_INVALID_OR_NO_LONGER_VALID = 110,
  // access token过期
  ACCESS_TOKEN_EXPIRED = 111,
  // 用户认证失败
  INVALID_CLIENT = 10001,
}

export type LoginBodyDto = {
  // 用户名
  username: string
  // 密码
  password: string
}

export type LoginResponseDto = {
  // 错误码
  code: ErrorCode
  // 响应信息
  msg: string
  // 用户id
  uid?: string
  // 用户信息
  userInfo?: any
  // 登录成功之后返回的token信息
  token?: string
  // token过期时间
  tokenExpired?: string
}


export type RegisterBodyDto = {
  // 用户名
  username: string
  // 密码
  password: string
  // 邀请码
  invitationCode?: string
}

export type RegisterResponseDto = {
  // 错误码
  code: ErrorCode
  // 响应信息
  msg: string
  // 用户id
  uid?: string
  // 用户信息
  userInfo?: any
  // 注册完成自动登录之后返回的token信息
  token?: string
  // token过期时间
  tokenExpired?: string
}

export type CheckTokenBodyDto = {
  readonly token: string
}

export type CheckTokenResponseDto = {
  // 错误码
  readonly code: ErrorCode
  // 响应信息
  readonly msg: string
  // 用户Id
  readonly uid?: string
  // 用户信息
  readonly userInfo?: any
  // token
  readonly token?: string
  // token过期时间
  readonly tokenExpired?: Date
}
