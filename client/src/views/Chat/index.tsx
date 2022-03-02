import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import {
  ChatNavigation,
  ChatSidebar,
  ChatMain,
} from '../../components/chat-layout'
import { NavTabItemName } from '../../@types/common.d'

import './index.scss'

export default function Chat() {
  const [currentTab, setCurrentTab] = useState<NavTabItemName>(
    NavTabItemName.CONVERSATIONS_LIST,
  )
  const [currentConversation, setCurrentConversation] = useState<any>()
  const [contact, setContact] = useState<any>()

  function onTabChange(tabId: NavTabItemName) {
    setCurrentTab(tabId)
  }

  function onConversationChange(conversation: any) {
    setCurrentConversation(conversation)
    console.log('#11', conversation)
  }

  function onContactChange(contact: any) {
    setContact(contact)
    console.log('联系人变更', contact)
  }

  return (
    <div id="chat-container">
      <div className="bg" />
      <div className="layout">
        <Grid container height="100%" wrap={'nowrap'}>
          <Grid item width={'80px'}>
            <ChatNavigation tabChange={onTabChange} />
          </Grid>
          <Grid item xs={3}>
            <ChatSidebar
              currentTab={currentTab}
              conversationChange={onConversationChange}
              onContactChange={onContactChange}
            />
          </Grid>
          <Grid item xs>
            <ChatMain
              currentConversation={currentConversation}
              currentTab={currentTab}
              contact={contact}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
