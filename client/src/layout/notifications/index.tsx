import React from 'react'
import { observer } from 'mobx-react-lite'
import { List, Avatar, Card, Tag, Button } from 'antd'
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import './index.scss'

const data = [
  {
    name: 'david',
  },
  {
    name: 'david',
  },
  {
    name: 'david',
  },
  {
    name: 'david',
  },
  {
    name: 'david',
  },
  {
    name: 'david',
  },
  {
    name: 'david',
  },
  {
    name: 'david',
  },
  {
    name: 'david',
  },
  {
    name: 'david',
  },
  {
    name: 'david',
  },
  {
    name: 'david',
  },
]

function NotificationItem() {
  return (
    <div className="hz-notification-item">
      <Card
        title="Default size card"
        extra={<Tag color="processing">待处理</Tag>}
        style={{ width: 350 }}
        actions={[
          <Button
            type="text"
            size="middle"
            shape="circle"
            // disabled
            icon={<CheckCircleOutlined />}
          />,
          <Button
            type="text"
            size="middle"
            shape="circle"
            // disabled
            icon={<CloseCircleOutlined />}
          />,
          <Button
            type="text"
            size="middle"
            shape="circle"
            danger
            // disabled
            icon={<DeleteOutlined />}
          />,
          // <CheckCircleOutlined key="setting" />,
          // <CloseCircleOutlined key="edit" />,
          // <DeleteOutlined key="ellipsis" />,
        ]}
      >
        <Card.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title="Card title"
          description="美女加个好友！！"
        />
      </Card>
    </div>
  )
}

export default observer(function Notifications() {
  function onChange(i: any) {
    console.log('notification', i)
  }

  return (
    <div className="hz-notifications">
      <div className="hz-notifications-col-left">
        <List
          itemLayout="horizontal"
          dataSource={data}
          split={false}
          renderItem={(item) => (
            <List.Item onClick={() => onChange(item)}>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={item.name}
                description={''}
              />
              <h1>123</h1>
            </List.Item>
          )}
        />
      </div>
      <div className="hz-notifications-col-right">
        <div className="hz-notifications-col-right-header"></div>
        <div className="hz-notifications-col-right-scroller">
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
        </div>
      </div>
    </div>
  )
})
