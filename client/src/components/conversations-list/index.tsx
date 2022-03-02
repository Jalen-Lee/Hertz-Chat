import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import './index.scss'
import SearchBar from '../conversations-search'
import AddBoxIcon from '@mui/icons-material/AddBox'
import ConversationItem from '../conversations-list-item'
import classNames from 'classnames'
import useStore from '../../hooks/useStore'

interface Conversation {
  name: string
  avatar: string
  summary: string
  date: string
}

const conversationsList = [
  {
    name: 'David',
    avatar: 'https://picsum.photos/id/409/200/200',
    summary:
      '中国陆军一个炮兵旅大概36门履带155榴和36门轮式155榴，36门300毫米火箭炮（12管）',
    date: '2022-1-27',
  },
  {
    name: 'Jaylenl',
    avatar: 'https://picsum.photos/id/409/200/200',
    summary:
      '中国陆军一个炮兵旅大概36门履带155榴和36门轮式155榴，36门300毫米火箭炮（12管）',
    date: '2022-1-27',
  },
]

interface Prop {
  conversationChange: any
  isShow: boolean
}

export default observer(function ({ conversationChange, isShow }: Prop) {
  const [currentConversation, setCurrentConversation] = useState<any>()
  const { chatStore } = useStore()

  useEffect(() => {}, [chatStore.conversationsList])

  function onConversationClose(
    e: React.MouseEvent<HTMLDivElement>,
    conversation: any,
  ) {
    console.log('从会话列表中删除会话', conversation)
  }

  function onConversationChoose(
    e: React.MouseEvent<HTMLDivElement>,
    conversation: any,
  ) {
    console.log('选择会话', conversation)
    setCurrentConversation(conversation)
    conversationChange(conversation)
  }

  return (
    <div
      className={classNames('conversation-list-container', {
        invisible: !isShow,
      })}
    >
      <div className="header">
        <div className="search-bar">
          <SearchBar />
        </div>
        <div className="join-btn">
          <AddBoxIcon fontSize={'medium'} />
        </div>
      </div>
      <div className="conversations-scroll-list">
        {chatStore.conversationsList.map((data) => {
          return (
            <ConversationItem
              data={data}
              key={data.id}
              onChoose={onConversationChoose}
              onClose={onConversationClose}
              hasChoose={
                currentConversation && data.id === currentConversation.id
              }
            />
          )
        })}
      </div>
    </div>
  )
})
