import React from "react";
import { Avatar } from 'antd'
import MyAvatar from "../../assets/avatar.jpeg";
import './index.scss'
import classNames from 'classnames'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')


function TextContent({content}:any){
  return <span className='message-body-text'>{content}</span>
}

function FileContent(){
  return <div></div>
}

function ImageContent(){
  return <div></div>
}

function VideoContent(){
  return <div></div>
}

function MessageBody(props:any){
  return (
    <div className='message-body'>
      <TextContent content={props.content}/>
    </div>
  )
}

const myId = '666'

export default function ConversationsDetailMessage(props:any){
  const {
    id,chat_type,msg_type,content,sender,post_date
  } = props.data


  return (
    <div className={'conversation-detail-message'}>
      <div className={classNames('message-wrap ',sender.uid === myId?'self':'opposite')}>
        <div className={'message-sender'}>
          <Avatar
            src={sender.avatar}
            shape={'square'}
            size={50}
            draggable={false}
          />
        </div>
        <div className={'message-content'}>
          <div className={classNames('message-content-header',{'invisible': chat_type === 'private'})}>
            jaylenl
          </div>
          <div className={'message-content-main'}>
            <MessageBody content={content}/>
          </div>
          <div className={'message-content-post-time'}>
            <span>{dayjs().fromNow(post_date)}</span>
          </div>
        </div>
        <div className={'message-status'}>
        </div>
      </div>

    </div>
  )
}
