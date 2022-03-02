import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import './index.scss'
import {
  KeyboardVoice as KeyboardVoiceIcon,
  Videocam as VideocamIcon,
} from '@mui/icons-material'
import Message from '../conversations-detail-message'
import TextBox from '../conversation-detail-textbox'
import useStore from '../../hooks/useStore'
import chatStore from '../../store/chat.store'

const msgList = [
  {
    id: '001',
    chat_type: 'private',
    msg_type: 'text',
    content:
      '对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。也可使用 gap 来设置字符距离左右两侧边界单位像素。',
    sender: {
      uid: '001',
      name: 'david',
      avatar:
        'https://pic2.zhimg.com/v2-e8240d5f2e9a3935d0b74f0c4d1e8c43_im.jpg',
    },
    post_date: new Date(),
  },
  {
    id: '002',
    chat_type: 'private',
    msg_type: 'text',
    content:
      '对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。也可使用 gap 来设置字符距离左右两侧边界单位像素。',
    sender: {
      uid: '002',
      name: 'mike',
      avatar:
        'https://pic2.zhimg.com/v2-e8240d5f2e9a3935d0b74f0c4d1e8c43_im.jpg',
    },
    post_date: new Date(),
  },
  {
    id: '003',
    chat_type: 'private',
    msg_type: 'text',
    content:
      '对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。也可使用 gap 来设置字符距离左右两侧边界单位像素。',
    sender: {
      uid: '003',
      name: 'john',
      avatar:
        'https://pic2.zhimg.com/v2-e8240d5f2e9a3935d0b74f0c4d1e8c43_im.jpg',
    },
    post_date: new Date(),
  },
]

interface ConversationDetailProps {
  detail: any
  children?: React.ReactNode
}

const renderMessages = observer(function (
  id: string,
  type: 'private' | 'group',
) {
  const {
    chatStore: { privateMessagesMap, groupMessagesMap },
  } = useStore()
  return (
    <>
      {type === 'private'
        ? privateMessagesMap
            .get(id)
            ?.map((i) => <Message data={i} key={i.id} />)
        : groupMessagesMap.get(id)?.map((i) => <Message data={i} key={i.id} />)}
    </>
  )
})

const ConversationDetail = observer(function ({
  detail,
}: ConversationDetailProps) {
  const { name, avatar, type } = detail
  console.log('conversation', detail)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const {
    chatStore: { privateMessagesMap, groupMessagesMap },
    userStore: { userinfo },
  } = useStore()

  const handleSubmit = function (val: string) {
    if (val.length === 0) return
    console.log('发送消息', val, val.length)
    if (detail.type === 'private') {
    } else if (detail.type === 'group') {
      chatStore.sendGroupMessage({
        groupId: detail.id,
        type: 'group',
        content: val,
        sender: userinfo,
      })
    }
    // chatStore.setMessagesMap(detail.id, [
    //   ...chatStore.messagesMap.get(detail.id)!,
    //   {
    //     id: Date.now().toString(),
    //     chat_type: Math.random() * 10 > 5 ? 'private' : 'group',
    //     msg_type: 'text',
    //     content: val,
    //     sender: {
    //       uid: Math.random() * 10 > 5 ? '666' : Date.now().toString(),
    //       name: 'jaylenl',
    //       avatar: avatar,
    //     },
    //     post_date: new Date(),
    //   },
    // ])
  }

  useEffect(() => {
    const { current: scrollerEl } = scrollerRef
    if (scrollerEl) {
      scrollerEl.scrollTop = scrollerEl.scrollHeight
    }
  }, [
    type === 'private'
      ? privateMessagesMap.get(detail.id)
      : groupMessagesMap.get(detail.id),
  ])

  return (
    <div className={'conversation-detail'}>
      <header className="header">
        <div className="left">
          <div className="friend-name">{name}</div>
        </div>
        <div className="right">
          <div className="video-call">
            <KeyboardVoiceIcon fontSize={'medium'} />
          </div>
          <div className="voice-call">
            <VideocamIcon fontSize={'medium'} />
          </div>
        </div>
      </header>
      <main className="content">
        <div className="msg-scroller" ref={scrollerRef}>
          <div className="no-more">没有更多了</div>
          {renderMessages(detail.id, detail.type)}
        </div>
      </main>
      <div className="input-area">
        <TextBox onSubmit={handleSubmit} />
      </div>
    </div>
  )
})

export default ConversationDetail
