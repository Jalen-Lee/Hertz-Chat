import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import './index.scss'
import SearchBar from '../conversations-search'
import AddBoxIcon from '@mui/icons-material/AddBox'
import ConversationItem from '../conversations-list-item'
import classNames from 'classnames'
import useStore from '../../hooks/useStore'

import { Modal, Input, Tabs } from 'antd'

const { Search } = Input
const { TabPane } = Tabs

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

interface ConversationsListProp {}

export default observer(function (props: ConversationsListProp) {
  const [visible, setVisible] = useState(false)
  const {
    appStore: { currentConversation, setCurrentConversation },
    chatStore,
  } = useStore()

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
  }

  function handleAdd() {
    setVisible(true)
  }

  function handleSearch() {}

  return (
    <div className="conversation-list-container">
      <div className="header">
        <div className="search-bar">
          <SearchBar />
        </div>
        <div className="join-btn" onClick={handleAdd}>
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
      <Modal
        title={'添加联系人'}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <Search
          placeholder={'请输入联系人'}
          allowClear
          size={'large'}
          onSearch={handleSearch}
        />

        <Tabs type="card">
          <TabPane tab="用户" key={'1'}>
            <h1>用户</h1>
          </TabPane>
          <TabPane tab="群聊" key={'2'}>
            <h1>群聊</h1>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  )
})
