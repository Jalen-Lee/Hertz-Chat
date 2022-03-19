import React from 'react'
import { observer } from 'mobx-react-lite'
import { Avatar, Button, Card, Divider, Descriptions } from 'antd'
import './index.scss'
import { ManOutlined, WomanOutlined } from '@ant-design/icons'

interface ProfileCardProps {
  data: any
  bordered?: boolean
  actions?: React.ReactNode[]
}

const labelStyle = {
  color: '#5d666e',
}

const contentStyle = {
  justifyContent: 'flex-end',
}

const genderIconStyle = {
  marginLeft: '5px',
}

export default observer(function ProfileCard({
  data,
  bordered = false,
  actions = [],
}: ProfileCardProps) {
  const { username, avatar, email, description, gender } = data
  return (
    <div className="profile-card">
      <Card
        style={{ width: 300 }}
        bodyStyle={
          {
            // padding: '18px 24px',
          }
        }
        bordered={bordered}
        cover={
          <img
            alt={`${username} cover`}
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={actions}
      >
        <>
          <Card.Meta
            avatar={<Avatar src={avatar} size="large" />}
            title={
              <span>
                {username}
                {gender === 0 ? (
                  <ManOutlined
                    style={{
                      ...genderIconStyle,
                      color: '#3f79fc',
                    }}
                  />
                ) : (
                  <WomanOutlined
                    style={{
                      ...genderIconStyle,
                      color: '#ef3ea0',
                    }}
                  />
                )}
              </span>
            }
            description={description}
          />
          <Divider style={{ margin: '16px 0' }} />
          <Descriptions
            column={1}
            layout="horizontal"
            labelStyle={labelStyle}
            contentStyle={contentStyle}
          >
            <Descriptions.Item label="邮箱">{email}</Descriptions.Item>
          </Descriptions>
        </>
      </Card>
    </div>
  )
})
