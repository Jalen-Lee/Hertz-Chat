import { ErrorCode } from '../../../common/constants'

export class LogoutBodyDto {
  readonly token: string
}

export class LogoutResponseDto {
  readonly code: ErrorCode
  readonly msg: string
}
