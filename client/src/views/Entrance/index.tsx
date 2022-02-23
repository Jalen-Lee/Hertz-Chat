import React, { useContext, useEffect, useState } from 'react'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { GlobalContext } from '../../App'
import { observer } from 'mobx-react-lite'
import './index.scss'
import useStore from '../../hooks/useStore'
import authStore from '../../store/auth.store'
import {message} from 'antd'


const LoginForm = observer(function() {

  const {appConfig} = useStore()
  // console.log('##',appConfig)
  const {isRememberAccount,rememberAccount} = appConfig
  const [account, setAccount] = useState(rememberAccount)
  // console.log(account)
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(isRememberAccount)
  // console.log(remember)
  const {authStore} = useStore()

  useEffect(function() {
    setAccount(appConfig.rememberAccount)
    setRemember(appConfig.isRememberAccount)
  },[appConfig])

  async function onLogin() {

    localStorage.setItem('hertz_config',JSON.stringify({
      ...appConfig,
      rememberAccount:account,
      isRememberAccount:remember
    }))

    authStore.signInAsync({
      account,
      password
    })
  }

  return (
    <div className='form-box'>
      <TextField
        label='账号'
        margin='normal'
        size='small'
        value={account}
        onChange={(e => setAccount(e.target.value))}
        style={{
          width: '320px', height: '40px',
        }}
      />
      <TextField
        label='密码'
        margin='normal'
        type='password'
        size='small'
        onChange={(e => setPassword(e.target.value))}
        style={{
          width: '320px', height: '40px',
        }}
      />
      <div className='option'>
        <FormControlLabel control={
          <Checkbox
            checked={remember}
            onChange={(e)=>setRemember(e.target.checked)}/>
        } label='记住账号' />
      </div>
      <Button
        variant='contained'
        style={{
          width: '320px', height: '40px',
        }}
        onClick={onLogin}
      >登录</Button>
    </div>
  )
})

const RegisterForm = function() {

  const [account, setAccount] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  async function onRegister() {
    if(password !== repeatPassword){
      message.error('两次输入的密码不一致！')
      return
    }
    authStore.signUpAsync({
      account,username,password
    })
  }

  return (
    <div className='form-box'>
      <TextField
        label='邮箱'
        margin='normal'
        size='small'
        style={{
          width: '320px', height: '40px',
        }}
        onChange={(e => setAccount(e.target.value))}
      />
      <TextField
        label='用户名'
        margin='normal'
        size='small'
        style={{
          width: '320px', height: '40px',
        }}
        onChange={(e => setUsername(e.target.value))}
      />
      <TextField
        type='password'
        label='密码'
        margin='normal'
        size='small'
        style={{
          width: '320px', height: '40px',
        }}
        onChange={(e => setPassword(e.target.value))}
      />
      <TextField
        type='password'
        label='重复密码'
        margin='normal'
        size='small'
        style={{
          width: '320px', height: '40px',
        }}
        onChange={(e => setRepeatPassword(e.target.value))}
      />
      <Button
        variant='contained'
        style={{
          width: '320px', height: '40px',
        }}
        onClick={onRegister}
      >注册</Button>
    </div>
  )
}

const ForgetPasswordForm = function() {
  return (
    <div></div>
  )
}


export default function Entrance(props: any) {

  const [mode, setMode] = useState('signin')

  const globalContext = useContext(GlobalContext)

  const tips: any = {
    'signin': '没有账号？注册',
    'signup': '已有账号？登录',
    'forget_password': '返回登录',
  }

  const forms: any = {
    'signin': <LoginForm/>,
    'signup': <RegisterForm/>,
    'forget_password': <ForgetPasswordForm/>,
  }

  function toggleMode() {
    if (mode === 'signin') setMode('signup')
    else if (mode === 'signup') setMode('signin')
    else if (mode === 'change_password') setMode('signin')
  }

  return (
    <>
      <div className='bg'></div>
      <div className='entrance-container'>
        <div className='form-wrapper'>
          <div className='top-row'>
            <div />
            <div />
            <div />
          </div>
          <div className='logo'>
            <img src='https://web.sdk.qcloud.com/im/demo/latest/img/logo.dc3be0d4.png' alt='logo' />
          </div>
          {
            forms[mode]
          }
          <Button variant='text' onClick={() => toggleMode()}>{
            tips[mode]
          }</Button>
        </div>
      </div>
    </>
  )
}
