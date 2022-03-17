import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import ConversationList from '../../conversations-list'
import ContactsList from '../../contacts-list'
import NotificationsList from '../../notifications-list'
import { NavTabItemName } from '../../../@types/common.d'

import './index.scss'

interface Prop {
  currentTab: NavTabItemName
  conversationChange: (conversation: any) => void
  onContactChange: (contact: any) => void
}

export default observer(function ({
  currentTab,
  conversationChange,
  onContactChange,
}: Prop) {
  return (
    <aside className="chat-layout-sidebar-container">
      <ConversationList />
      <ContactsList
        onContactChange={onContactChange}
        isShow={currentTab === NavTabItemName.CONTACTS_LIST}
      />
      <NotificationsList
        onChange={() => 11}
        isShow={currentTab === NavTabItemName.CONTACTS_LIST}
      />
    </aside>
  )
})
