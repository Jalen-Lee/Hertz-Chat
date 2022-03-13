import React from 'react'
import { observer } from 'mobx-react-lite'
import { Avatar, Button, Divider } from 'antd'
import './index.scss'

import bg from '../../assets/17052.jpg'
import avatar from '../../assets/avatar.jpeg'
import useStore from '../../hooks/useStore'

const InfoRow = function () {
  return (
    <div className="profile-card-info-row">
      <div className="profile-card-info-row-label">性别</div>
      <div className="profile-card-info-row-value">
        男水电费水电费舒服舒服舒服非法所得发沙发上
      </div>
    </div>
  )
}

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
      <div className="profile-card-main">
        <InfoRow />
        <InfoRow />
        <InfoRow />
        <InfoRow />
        <InfoRow />
      </div>

      <div className="profile-card-footer">
        <Button type="link">个人信息管理</Button>
        <Divider type="vertical" />
        <Button type="link">个人信息管理</Button>
      </div>
    </div>
  )
})
