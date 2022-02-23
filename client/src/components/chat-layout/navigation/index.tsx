import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import Avatar from '@mui/material/Avatar'
import NavTabItem from '../../nav-tab-item'
import ChatIcon from '@mui/icons-material/Chat'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import useStore from '../../../hooks/useStore'
import './index.scss'
import { NavTabItemName } from '../../../types/common.d'

interface Prop {
  tabChange:(tabId:NavTabItemName)=>void
}

export default observer(function({ tabChange }:Prop){

  const [currentTab,setCurrentTab] = useState<NavTabItemName>(NavTabItemName.CONVERSATIONS_LIST)

  const {userStore} = useStore()

  function onNavItemClick(e:React.MouseEvent<HTMLDivElement>,id:NavTabItemName){
    console.log("点击navTabItem",id)
    setCurrentTab(id)
    tabChange(id)
  }

  return (
    <nav className='chat-layout-navigation-container'>
      <div className='profile'>
        <Avatar
          src={userStore.userinfo && userStore.userinfo.avatar}
          alt={userStore.userinfo && userStore.userinfo.username}
          style={{
            width:'50px',height:'50px'
          }}/>
      </div>
      <div className='tabs-list'>
        <div className='row-1'>
          <NavTabItem id={NavTabItemName.CONVERSATIONS_LIST} title='会话列表' onClick={onNavItemClick} isActive={currentTab === NavTabItemName.CONVERSATIONS_LIST}>
            <ChatIcon fontSize={'large'}/>
          </NavTabItem>
          <NavTabItem id={NavTabItemName.CONTACTS_LIST} title='好友列表' onClick={onNavItemClick} isActive={currentTab === NavTabItemName.CONTACTS_LIST}>
            <PeopleIcon fontSize={'large'}/>
          </NavTabItem>
        </div>
        <div className='row-2'>
          <NavTabItem id={NavTabItemName.CHAT_SETTING} title='设置' onClick={onNavItemClick} isActive={currentTab === NavTabItemName.CHAT_SETTING}>
            <SettingsIcon fontSize={'large'}/>
          </NavTabItem>
        </div>
      </div>
    </nav>
  )
})

