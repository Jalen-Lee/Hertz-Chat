import React,{useState}from 'react'
import './index.scss'
import { Button,Checkbox } from 'antd';
import {CheckboxChangeEvent} from "antd/es/checkbox";
import Illustration from '../../assets/Login/Illustration.svg'
import Logo from '../../assets/Login/logo.svg'
import { UserOutlined,LockOutlined} from '@ant-design/icons';
import { SwitchTransition,CSSTransition,TransitionGroup } from 'react-transition-group';


function SignIn(){
  function onChange(e:CheckboxChangeEvent) {
    console.log(`checked = ${e.target.checked}`);
  }
  return (
    <>
      <p className='login-page-side-right-title'>欢迎登录GraceChat</p><p
      className='login-page-side-right-subtitle'>生活是一种方式</p>
      <div className='login-page-side-right-form'>
        <div className='login-page-side-right-form-field'>
          <div className='login-page-side-right-form-field-icon'>
            <UserOutlined style={{fontSize: '24px'}}/>
          </div>
          <input type="text" className='login-page-side-right-form-field-input'/>
        </div>
        <div className='login-page-side-right-form-field'>
          <div className='login-page-side-right-form-field-icon'>
            <LockOutlined style={{fontSize: '24px'}}/>
          </div>
          <input type="password" className='login-page-side-right-form-field-input'/>
        </div>
        <div className='login-page-side-right-form-options'>
          <Checkbox onChange={onChange}>记住账号</Checkbox>
          <Button type="link" style={{padding: '0'}}>
            忘记密码？
          </Button>
        </div>
        <button className='login-page-side-right-form-btn-submit'>
          登录
        </button>
      </div>
    </>
  )
}

function SignUp(){
  return (
    <>
      <h1>注册页面</h1>
    </>
  )
}




function FormArea(props:any){
  const {mode} = props
  let el = null
  if(mode === 'SignUp') el = (
      <SignUp/>
  )
  else if(mode === 'SignIn') el = (
        <SignIn/>
  )
  return el
}





const  Sidebar = React.memo(function (){
  return (
    <div className='login-page-side-left'>
      <header className='login-page-side-left-header'>
        <img src={Logo} alt="grace-chart-logo" className='login-page-side-left-header-logo'/>
        <span className='login-page-side-left-header-name'>GraceChat</span>
      </header>
      <img className='login-page-side-left-img' src={Illustration} alt=""/>
      <p className='login-page-side-left-text-1'>信息专注、群聊沟通、视频会议</p>
      <p className='login-page-side-left-text-2'>一站式无缝办公协作，团队上下对齐目标，全面激活组织和个人。飞书，定义先进团队的工作方式。</p>
    </div>
  )
})

function MsgBubble(props:any){
  return (
    <div className='msg-bubble msg-bubble-receive'>
      <span className='msg-bubble-content'>{props.content}</span>
    </div>
  )
}


function EntryLayout() {
  const [mode,setMode] = useState('SignIn')
  function changeMode(){
    mode === 'SignUp'? setMode('SignIn'):setMode('SignUp')
  }
  return (
    <div className='login-page'>
      <Sidebar/>


      <div className='login-page-side-right'>
        <div className='login-page-side-right-header'>
          <Button type="link" onClick={changeMode}>
            没有账号？注册
          </Button>
        </div>
          <FormArea mode={mode}/>
        <footer className='login-page-side-right-footer'>
          <p className='login-page-side-right-footer-p'>Copyright 2021 - 2022 JaylenL All rights Reserved</p>
          <p className='login-page-side-right-footer-p'>京ICP备16045432号-4</p>
        </footer>
      </div>
    </div>
  )
}

export default EntryLayout
