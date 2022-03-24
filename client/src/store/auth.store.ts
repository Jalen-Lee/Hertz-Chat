import { makeAutoObservable, runInAction } from 'mobx'
import { checkToken, signIn, signUp } from '../apis/auth'
import { message } from 'antd'
import { ErrorCode, LoginBodyDto, RegisterBodyDto } from '../@types/dto.d'
import userStore from './user.store'
import chatStore from './chat.store'
import { removeToken, setToken } from '../utils/token'

class AuthStore {
  token = ''
  uploadToken = ''
  hasLogin = false

  initTokenFromLocal(token: string) {
    this.token = token
  }

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    )
  }

  signInAsync(payload: any) {
    runInAction(async () => {
      try {
        const { code, data, err_msg } = await signIn(payload)
        if (code === ErrorCode.SUCCESS) {
          userStore.userinfo = data.userinfo
          this.token = data.token!
          setToken(data.token!)
          message.success('登录成功!')
          chatStore.socketConnect()
          this.hasLogin = true
        } else {
          message.success(`登录失败，${data.msg}`)
        }
      } catch (err: any) {
        message.error(`登录失败，${err.message}`)
      }
    })
  }

  signUpAsync(payload: any) {
    runInAction(async () => {
      try {
        const { code, data, err_msg } = await signUp(payload)
        if (code === ErrorCode.SUCCESS) {
          this.token = data.data.token!
          setToken(data.token!)
          userStore.userinfo = data.userinfo
          message.success(`账号注册成功！`)
          chatStore.socketConnect()
          this.hasLogin = true
        } else {
          message.error(`账号注册失败！，${data.msg}`)
        }
      } catch (err: any) {
        message.error(`账号注册失败，${err.message}`)
      }
    })
  }

  checkTokenAsync() {
    try {
      runInAction(async () => {
        const { code, data, err_msg } = await checkToken({ token: this.token })
        if (code === ErrorCode.SUCCESS) {
          userStore.userinfo = data.userinfo
          message.success('欢迎再次登录！')
          chatStore.socketConnect()
          this.hasLogin = true
        } else {
          this.token = ''
          removeToken()
          message.error(`身份信息已失效，请重新登录`)
        }
      })
    } catch (err: any) {
      message.error(`token校验失败，${err.message}`)
    }
  }

  logOutAsync() {
    this.token = ''
    this.hasLogin = false
    removeToken()
  }

  setUploadToken(token: string) {
    this.uploadToken = token
  }
}

export default new AuthStore()
