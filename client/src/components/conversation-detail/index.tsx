import React, { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import './index.scss'
import {
  KeyboardVoice as KeyboardVoiceIcon,
  Videocam as VideocamIcon,
} from '@mui/icons-material'
import Message from '../conversations-detail-message'
import TextBox from '../conversation-detail-textbox'
import useStore from '../../hooks/useStore'

interface ConversationDetailProps {
  conversation: IConversation
  children?: React.ReactNode
}

interface MessagesScrollerProps {
  id: string
  type: string
  children?: React.ReactNode
}

const MessagesScroller = observer(function (props: MessagesScrollerProps) {
  const { id, type } = props
  const {
    chatStore: { privateMessagesMap, groupMessagesMap },
  } = useStore()
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const { current: scrollerEl } = scrollerRef
    if (scrollerEl) {
      scrollerEl.scrollTop = scrollerEl.scrollHeight
    }
  }, [type === 'private' ? privateMessagesMap.get(id) : groupMessagesMap.get(id)])
  return (
    <div className="msg-scroller" ref={scrollerRef}>
      <div className="no-more">没有更多了</div>
      {type === 'private'
        ? privateMessagesMap
            .get(id)
            ?.map((i) => <Message data={i} key={i.id} />)
        : groupMessagesMap.get(id)?.map((i) => <Message data={i} key={i.id} />)}
    </div>
  )
})

const ConversationDetail = observer(function ({
  conversation,
}: ConversationDetailProps) {
  console.log('conversation', conversation)
  const {
    userStore: { userinfo },
    chatStore: { sendPrivateMessage, sendGroupMessage },
  } = useStore()

  const handleSubmit = function (val: string) {
    if (val.length === 0) return
    console.log('发送消息', val, val.length)
    if (conversation.type === 'private') {
      sendPrivateMessage({})
    } else if (conversation.type === 'group') {
      sendGroupMessage({
        groupId: conversation.id,
        messageType: 'text',
        content: val,
        senderInfo: userinfo!,
        postDate: new Date(),
      })
    }
  }

  return (
    <div className={'conversation-detail'}>
      <header className="header">
        <div className="left">
          <div className="friend-name">{conversation.name}</div>
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
        <MessagesScroller id={conversation.id} type={conversation.type} />
      </main>
      <div className="input-area">
        <TextBox onSubmit={handleSubmit} />
      </div>
    </div>
  )
})

export default ConversationDetail
