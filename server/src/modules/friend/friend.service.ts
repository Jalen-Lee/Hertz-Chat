import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ErrorCode } from '../../common/constants'

import { UserProfileEntity } from '../../entities/UserProfile.entity'
import { UserAccountEntity } from '../../entities/UserAccount.entity'
import { FriendEntity } from '../../entities/Friend.entity'
import { FriendMessageEntity } from '../../entities/FriendMessage.entity'

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(UserProfileEntity)
    private profileRepo: Repository<UserProfileEntity>,
    @InjectRepository(UserAccountEntity)
    private accountRepo: Repository<UserAccountEntity>,
    @InjectRepository(FriendEntity)
    private friendRepo: Repository<FriendEntity>,
    @InjectRepository(FriendMessageEntity)
    private friendMessageRepo: Repository<FriendMessageEntity>,
  ) {}
}
