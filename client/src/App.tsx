import React, { createContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Chat from './views/Chat'
import Entrance from './views/Entrance'
import useStore from './hooks/useStore'

export const GlobalContext = createContext<any>({})

function App(props: any) {
  const { appInit, authStore, chatStore } = useStore()
  const hasLogin = authStore.hasLogin
  // const hasLogin = true

  console.log(props.children)

  useEffect(() => {
    appInit()
    chatStore.socketInit()
    if (authStore.token) {
      authStore.checkTokenAsync()
    }
  }, [])

  return hasLogin ? <Chat /> : <Entrance />
}

export default observer(App)
