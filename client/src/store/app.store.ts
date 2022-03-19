import { makeAutoObservable } from 'mobx'
import { NavTabItemId } from '../layout/navigations'
class AppStore {
  // 当前选中的NavTab
  currentNavTab: NavTabItemId | string = 'notifications'

  currentConversation: any

  currentSettingsNavTab: string = 'profile'

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    )
  }

  setCurrentNavTab(tab: NavTabItemId) {
    this.currentNavTab = tab
  }

  setCurrentConversation(conversation: any) {
    this.currentConversation = conversation
  }

  setCurrentSettingsNavTab(tab: string) {
    console.log('setCurrentSettingsNavTab', tab)
    this.currentSettingsNavTab = tab
  }
}

export default new AppStore()
