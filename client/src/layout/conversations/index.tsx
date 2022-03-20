import React from 'react'
import { observer } from 'mobx-react-lite'
import ConversationsList from '../../components/conversations-list'
import ConversationDetail from '../../components/conversation-detail'
import IEmpty, { IEmptyType } from '../../components/i-empty'

import './index.scss'
import useStore from '../../hooks/useStore'

export default observer(function Conversations() {
  const {
    appStore: { currentConversation },
  } = useStore()

  return (
    <div className="hz-conversations">
      <div className="hz-conversations-col-left">
        <ConversationsList />
      </div>
      <div className="hz-conversations-col-right">
        {currentConversation ? <ConversationDetail /> : <IEmpty />}
      </div>
    </div>
  )
})
