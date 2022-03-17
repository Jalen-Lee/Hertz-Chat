import React from 'react'
import { observer } from 'mobx-react-lite'
import Avatar from '@mui/material/Avatar'
import NavTabItem from '../../components/nav-tab-item'
import ChatIcon from '@mui/icons-material/Chat'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'
import useStore from '../../hooks/useStore'
import { Popover } from 'antd'
import ProfileCard from '../../components/profile-card'

import './index.scss'

interface NavigationsProp {}

export enum NavTabItemId {
  CONVERSATIONS = 'conversations',
  CONTACTS = 'contacts',
  SETTINGS = 'settings',
  NOTIFICATIONS = 'notifications',
}

export default observer(function Navigations(props: NavigationsProp) {
  const {
    userStore: { userinfo },
    appStore: { currentNavTab, setCurrentNavTab },
  } = useStore()

  function onChange(e: React.MouseEvent<HTMLDivElement>, id: NavTabItemId) {
    console.log('点击navTabItem', id)
    setCurrentNavTab(id)
  }

  return (
    <nav className="hz-navigation">
      <div className="profile">
        <Popover
          placement="rightTop"
          content={<ProfileCard />}
          trigger="click"
          overlayStyle={{
            padding: '0',
            borderRadius: '5px',
          }}
          overlayInnerStyle={{
            padding: '0',
          }}
        >
          <Avatar
            src={userinfo?.avatar}
            alt={userinfo?.username}
            style={{
              width: '50px',
              height: '50px',
            }}
          />
        </Popover>
      </div>
      <div className="tabs-list">
        <div className="row-1">
          <NavTabItem
            id={NavTabItemId.CONVERSATIONS}
            title="会话列表"
            onClick={onChange}
            isActive={currentNavTab === NavTabItemId.CONVERSATIONS}
          >
            <ChatIcon fontSize={'large'} />
          </NavTabItem>
          <NavTabItem
            id={NavTabItemId.CONTACTS}
            title="好友列表"
            onClick={onChange}
            isActive={currentNavTab === NavTabItemId.CONTACTS}
          >
            <PeopleIcon fontSize={'large'} />
          </NavTabItem>
          <NavTabItem
            id={NavTabItemId.NOTIFICATIONS}
            title="通知"
            onClick={onChange}
            isActive={currentNavTab === NavTabItemId.NOTIFICATIONS}
          >
            <NotificationsIcon fontSize={'large'} />
          </NavTabItem>
        </div>
        <div className="row-2">
          <NavTabItem
            id={NavTabItemId.SETTINGS}
            title="设置"
            onClick={onChange}
            isActive={currentNavTab === NavTabItemId.SETTINGS}
          >
            <SettingsIcon fontSize={'large'} />
          </NavTabItem>
        </div>
      </div>
    </nav>
  )
})
