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
