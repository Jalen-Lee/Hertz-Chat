import { makeAutoObservable } from 'mobx'

class AppStore {
  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    )
  }
}

export default new AppStore()
