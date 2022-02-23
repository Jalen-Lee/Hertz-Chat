import { ErrorCode } from '../../../common/constants'

export class AddFriendBodyDto {
  readonly uid: string
  readonly friendId: string
}

export class AddFriendResponseDto {
  readonly code: ErrorCode
  readonly msg: string
}
