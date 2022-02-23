import { ErrorCode } from '../../../common/constants'

export class UpdateUserBodyDto {
  readonly uid: string
  readonly others: any
}

export class UpdateUserResponseDto {
  readonly code: ErrorCode
  readonly msg: string
}
