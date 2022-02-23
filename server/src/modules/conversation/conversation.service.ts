import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ErrorCode } from '../../common/constants'

import { UserProfileEntity } from '../../entities/UserProfile.entity'
import { UserAccountEntity } from '../../entities/UserAccount.entity'
import { FriendEntity } from '../../entities/Friend.entity'
import { FriendMessageEntity } from '../../entities/FriendMessage.entity'
import { ConversationEntity } from '../../entities/Conversation.entity'

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(UserProfileEntity)
    private profileRepo: Repository<UserProfileEntity>,
    @InjectRepository(UserAccountEntity)
    private accountRepo: Repository<UserAccountEntity>,
    @InjectRepository(FriendEntity)
    private friendRepo: Repository<FriendEntity>,
    @InjectRepository(FriendMessageEntity)
    private friendMessageRepo: Repository<FriendMessageEntity>,
    @InjectRepository(ConversationEntity)
    private conversationRepo: Repository<ConversationEntity>,
  ) {}

  /**
   * 获取用户的历史会话
   * @param uid
   */
  async getUserConversations(uid: string) {
    try {
      const conversations = await this.conversationRepo.find({
        uid,
      })
      return Promise.resolve({
        data: conversations,
      })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  /**
   * 添加会话
   * @param payload
   */

  async addConversation(payload: any) {
    try {
      const { uid, peer_id, type, name, avatar } = payload
      const conversation = this.conversationRepo.create({
        uid,
        peer_id,
        type,
        name,
        avatar,
      })
      const conversationRecord = await this.conversationRepo.save(conversation)
      return Promise.resolve({
        data: conversationRecord,
      })
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
