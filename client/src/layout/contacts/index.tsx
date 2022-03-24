import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import './index.scss'
import { Collapse, List, Avatar, Card, Divider } from 'antd'
import { MessageOutlined, DeleteOutlined } from '@ant-design/icons'
import useStore from '../../hooks/useStore'
import * as stream from 'stream'

const { Panel } = Collapse

function callback(key: any) {
  console.log(key)
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
]

export default observer(function Contacts() {
  const [currentContact, setContact] = useState()

  const {
    chatStore: { friendsList, groupsList },
  } = useStore()

  function onCollapseChange(key: string | string[]) {}

  function onListItemChange(item: any) {
    console.log('onListItemChange', item)
    setContact(item)
  }

  return (
    <div className="hz-contacts">
      <div className="hz-contacts-col-left">
        <Collapse defaultActiveKey={['1']} onChange={onCollapseChange}>
          <Panel header="我的好友" key="friends">
            <List
              itemLayout="horizontal"
              dataSource={friendsList}
              renderItem={(friend) => (
                <List.Item onClick={() => onListItemChange(friend)}>
                  <List.Item.Meta
                    avatar={<Avatar src={friend.avatar} size="large" />}
                    title={friend.name}
                  />
                </List.Item>
              )}
            />
          </Panel>
          <Panel header="我的群聊" key="groups">
            <List
              itemLayout="horizontal"
              dataSource={groupsList}
              renderItem={(group) => (
                <List.Item onClick={() => onListItemChange(group)}>
                  <List.Item.Meta
                    avatar={<Avatar src={group.avatar} size="large" />}
                    title={group.name}
                  />
                </List.Item>
              )}
            />
          </Panel>
        </Collapse>
      </div>
      <div className="hz-contacts-col-right">
        {/*{*/}
        {/*  currentContact ? */}
        {/*}*/}
        <Card
          style={{ width: 350 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[<MessageOutlined />, <DeleteOutlined />]}
        >
          <>
            <Card.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description="This is the description"
            />
            <Divider />
            <h1>123</h1>
          </>
        </Card>
      </div>
    </div>
  )
})
