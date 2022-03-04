import React from 'react'
import { Avatar } from 'antd'
import './index.scss'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import useStore from '../../hooks/useStore'
import { timeFromNow } from '../../utils/date'

function TextContent({ content }: any) {
  return <span className="message-body-text">{content}</span>
}

function FileContent() {
  return <div></div>
}

function ImageContent() {
  return <div></div>
}

function VideoContent() {
  return <div></div>
}

function MessageBody(props: any) {
  return (
    <div className="message-body">
      <TextContent content={props.content} />
    </div>
  )
}

const ConversationsDetailMessage = observer(function (props: any) {
  const { id, content, senderInfo, messageType, postDate } = props.data
  const { userStore } = useStore()

  return (
    <div className={'conversation-detail-message'}>
      <div
        className={classNames(
          'message-wrap ',
          senderInfo.uid === userStore.uid ? 'self' : 'opposite',
        )}
      >
        <div className={'message-sender'}>
          <Avatar
            src={senderInfo.avatar}
            shape={'square'}
            size={50}
            draggable={false}
          />
        </div>
        <div className={'message-content'}>
          <div
            className={classNames('message-content-header', {
              invisible: messageType === 'private',
            })}
          >
            {senderInfo.username}
          </div>
          <div className={'message-content-main'}>
            <MessageBody content={content} />
          </div>
          <div className={'message-content-post-time'}>
            <span>{timeFromNow(postDate)}</span>
          </div>
        </div>
        <div className={'message-status'}></div>
      </div>
    </div>
  )
})

export default ConversationsDetailMessage
