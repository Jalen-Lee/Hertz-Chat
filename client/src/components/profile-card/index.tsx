import React from 'react'
import { observer } from 'mobx-react-lite'
import { Avatar } from 'antd'
import './index.scss'

import bg from '../../assets/17052.jpg'
import avatar from '../../assets/avatar.jpeg'
import useStore from '../../hooks/useStore'

export default observer(function ProfileCard() {
  const { userStore } = useStore()
  return (
    <div className="profile-card">
      <div className="profile-card-header">
        <div className="profile-card-header-top">
          <div className="cover">
            <img src={bg} alt="" />
          </div>
          <div className="avatar">
            <Avatar
              src={avatar}
              style={{
                width: '95px',
                height: '95px',
                fontSize: '0',
              }}
            />
          </div>
        </div>
        <div className="profile-card-header-bottom"></div>
      </div>
      <div className="profile-card-main"></div>

      <div className="profile-card-footer"></div>
    </div>
  )
})
