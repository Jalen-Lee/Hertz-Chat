import React from 'react'
import { observer } from 'mobx-react-lite'
import './index.scss'
import { Tabs, Form, Input, Button, Checkbox } from 'antd'
import useStore from '../../hooks/useStore'

const { TabPane } = Tabs

const ProfileForm = observer(function () {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="hz-settings-profile">
      <Form
        name="profile"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelCol={{ span: 8 }}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
})

export default observer(function Settings() {
  const {
    appStore: { currentSettingsNavTab, setCurrentSettingsNavTab },
  } = useStore()
  function onChange(key: string) {
    console.log('设置NavTab：', key)
    setCurrentSettingsNavTab(key)
  }
  return (
    <div className="hz-settings">
      <Tabs
        onChange={onChange}
        tabPosition="left"
        defaultActiveKey="profile"
        activeKey={currentSettingsNavTab}
        size="large"
      >
        <TabPane tab="个人信息" key="profile">
          <ProfileForm />
        </TabPane>
        <TabPane tab="通用设置" key="common-setting">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="消息通知" key="notification">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="账号设置" key="account">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  )
})
