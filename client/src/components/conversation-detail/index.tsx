import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import './index.scss'
import {
  KeyboardVoice as KeyboardVoiceIcon,
  Videocam as VideocamIcon
} from '@mui/icons-material'
import Message from '../conversations-detail-message'
import TextBox from '../conversation-detail-textbox'

const message1 = {
  from: 'opposite',
  type: 'text',
  content: '自动调整字符大小\n' +
    '对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。也可使用 gap 来设置字符距离左右两侧边界单位像素。',
}
const message2 = {
  from: 'self',
  type: 'text',
  content: '自动调整字符大小\n' +
    '对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。也可使用 gap 来设置字符距离左右两侧边界单位像素。',
}

const msgList = [
  {
    id:'001',
    chat_type:'private',
    msg_type:'text',
    content:'对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。也可使用 gap 来设置字符距离左右两侧边界单位像素。',
    sender:{
      uid:'001',
      name:'david',
      avatar:'https://pic2.zhimg.com/v2-e8240d5f2e9a3935d0b74f0c4d1e8c43_im.jpg'
    },
    post_date: new Date()
  },
  {
    id:'002',
    chat_type:'private',
    msg_type:'text',
    content:'对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。也可使用 gap 来设置字符距离左右两侧边界单位像素。',
    sender:{
      uid:'002',
      name:'mike',
      avatar:'https://pic2.zhimg.com/v2-e8240d5f2e9a3935d0b74f0c4d1e8c43_im.jpg'
    },
    post_date: new Date()
  },
  {
    id:'003',
    chat_type:'private',
    msg_type:'text',
    content:'对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。也可使用 gap 来设置字符距离左右两侧边界单位像素。',
    sender:{
      uid:'003',
      name:'john',
      avatar:'https://pic2.zhimg.com/v2-e8240d5f2e9a3935d0b74f0c4d1e8c43_im.jpg'
    },
    post_date: new Date()
  }
]

interface ConversationDetailProps{
  detail:any
  children?:React.ReactNode
}


const ConversationDetail = observer(function ({ detail }:ConversationDetailProps){
  const {name,avatar} = detail

  const [messages,setMessages] = useState<any[]>(msgList)

  const scrollerRef = useRef<HTMLDivElement>(null)

  const handleSubmit = function(val:string){
    if(val.length === 0) return
    console.log('发送消息',val,val.length)
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        chat_type:(Math.random()*10)>5?'private':'group',
        msg_type:'text',
        content: val,
        sender:{
          uid:(Math.random()*10)>5?'666':Date.now().toString(),
          name:'jaylenl',
          avatar:avatar
        },
        post_date: new Date()
      }
    ])
  }

  useEffect(()=>{
    const {current:scrollerEl} = scrollerRef
    if(scrollerEl){
      scrollerEl.scrollTop = scrollerEl.scrollHeight
    }
  },[messages])

  return (
    <div className={'conversation-detail'}>
      <header className='header'>
        <div className='left'>
          <div className='friend-name'>{name}</div>
        </div>
        <div className='right'>
          <div className='video-call'>
            <KeyboardVoiceIcon fontSize={'medium'}/>
          </div>
          <div className='voice-call'>
            <VideocamIcon fontSize={'medium'}/>
          </div>
        </div>
      </header>
      <main className='content'>
        <div className='msg-scroller' ref={scrollerRef}>
          <div className='no-more'>没有更多了</div>
          {
            messages.map(i=>(
              <Message data={i} key={i.id}/>
            ))
          }
          {/*<Message data={message2} />*/}
          {/*<Message data={message2} />*/}
          {/*<Message data={message2} />*/}
          {/*<Message data={message2} />*/}
          {/*<Message data={message2} />*/}
          {/*<div className='no-more'>17:15</div>*/}
          {/*<Message data={message2} />*/}
        </div>
      </main>
      <div className='input-area'>
        <TextBox onSubmit={handleSubmit}/>
      </div>
    </div>
  )
})

export default ConversationDetail


