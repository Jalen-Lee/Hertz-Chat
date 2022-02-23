import React from 'react'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import {Button,Avatar,Divider} from 'antd'
import './index.scss'
import dayjs from 'dayjs'


const FriendDetail = function(props:{

}){

  return (
    <div className={'contacts-detail'}>
      <div className={'friend-detail'}>
        <div className={'friend-detail-header'}>
          <div className={'left'}>
            <div className={'name'}>
              <span >李云飞</span>
            </div>
            <div className={'description'}>这是一段描述</div>
          </div>
          <div className={'right'}>
            <Avatar
              src={'https://p3-passport.byteacctimg.com/img/user-avatar/8c81576e8b5fe3bb461ea2c8dd2e4f21~300x300.image'}
              size={100}
              shape={'square'}
            />
          </div>
        </div>
        <Divider/>
        <div className={'friend-detail-main'}>

        </div>
        <Divider/>
        <div className={'friend-detail-footer'}>
          <Button type="primary" size={'large'} style={{letterSpacing:'2px'}}>发消息</Button>
        </div>
      </div>
    </div>
  )
}

const GroupDetail = function(props:{
  data:any
}){

  const {data} = props
  return (
    <div className={'contacts-detail'}>
      <div className={'group-detail'}>
        <div className={'group-detail-header'}>
          <div className={'left'}>
            <div className={'name'}>
              <span >{data.name}</span>
            </div>
            <div className={'description'}>{data.description}</div>
          </div>
          <div className={'right'}>
            <Avatar
              src={data.icon}
              size={100}
              shape={'square'}
            />
          </div>
        </div>
        <Divider/>
        <div className={'group-detail-main'}>

        </div>
        <Divider/>
        <div className={'group-detail-footer'}>
          <Button type="primary" size={'large'} style={{letterSpacing:'2px'}}>发消息</Button>
        </div>
      </div>
    </div>
  )
}

export default observer(function ContactsDetail(props:{
  data:any
}){
  const {type} = props.data

  if(type === 'friend'){
    return <FriendDetail/>
  }else if(type === 'group'){
    return <GroupDetail data={props.data}/>
  }else{
    return <></>
  }
})

