import { makeAutoObservable } from 'mobx'
import userStore from './user.store'
import authStore from './auth.store'
import chatStore from './chat.store'
import appStore from './app.store'
import { getToken } from '../utils/token'

class RootStore {
  appName = 'Hertz Chat'
  author = 'Jaylen Lee'
  version = '1.0.0'

  appConfig = {
    isRememberAccount: false,
    rememberAccount: '',
  }

  userStore = userStore
  authStore = authStore
  chatStore = chatStore
  appStore = appStore

  constructor() {
    makeAutoObservable(
      this,
      {
        userStore: false,
        authStore: false,
        chatStore: false,
      },
      {
        autoBind: true,
      },
    )
  }

  setAppConfig(config: any) {
    this.appConfig = config
  }

  appInit() {
    console.log('appInit')
    this.setAppConfig(JSON.parse(localStorage.getItem('hertz_config') || '{}'))
    console.log(this.appConfig)
    const token = getToken()
    this.authStore.initTokenFromLocal(token)
  }
}

export default new RootStore()
