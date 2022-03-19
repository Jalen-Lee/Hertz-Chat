import React from 'react'
import { observer } from 'mobx-react-lite'
import './index.scss'
import { Collapse, List, Avatar, Card, Divider } from 'antd'
import { MessageOutlined, DeleteOutlined } from '@ant-design/icons'

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
  function onChange(item: any) {}

  return (
    <div className="hz-contacts">
      <div className="hz-contacts-col-left">
        <Collapse defaultActiveKey={['1']} onChange={callback}>
          <Panel header="我的好友" key="1">
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item onClick={() => onChange(item)}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src="https://joeschmoe.io/api/v1/random"
                        size="large"
                      />
                    }
                    title={item.title}
                  />
                </List.Item>
              )}
            />
          </Panel>
          <Panel header="我的群聊" key="2">
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item onClick={() => onChange(item)}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src="https://joeschmoe.io/api/v1/random"
                        size="large"
                      />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </Panel>
        </Collapse>
      </div>
      <div className="hz-contacts-col-right">
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
