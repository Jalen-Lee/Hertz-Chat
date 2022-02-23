import { ErrorCode } from '../../../common/constants'

export class UpdatePwdBodyDto {
  readonly uid: string
  readonly oldPassword: string
  readonly newPassword: string
}

export class UpdatePwdResponseDto {
  readonly code: ErrorCode
  readonly msg: string
}
