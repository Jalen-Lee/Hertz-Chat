import React from 'react'
import { observer } from 'mobx-react-lite'
import './index.scss'

export default observer(function NotificationsList(props: any) {
  return (
    <div className="notifications-list">
      <div className="notifications-list-item">好友申请</div>
      <div className="notifications-list-item">系统通知</div>
    </div>
  )
})
