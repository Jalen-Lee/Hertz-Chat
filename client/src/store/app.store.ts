import { makeAutoObservable } from 'mobx'
import { NavTabItemId } from '../layout/navigations'
class AppStore {
  // 当前选中的NavTab
  currentNavTab: NavTabItemId | string = 'notifications'

  currentConversation: any

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
}

export default new AppStore()
