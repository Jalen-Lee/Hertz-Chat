import React from 'react'
import { observer } from 'mobx-react-lite'
import './index.scss'
import { Contacts, Conversations, Notifications } from '../index'
import useStore from '../../hooks/useStore'
import classNames from 'classnames'
import { NavTabItemId } from '../navigations'

export default observer(function NavigationsView() {
  const {
    appStore: { currentNavTab },
  } = useStore()

  return (
    <>
      <div
        className={classNames('hz-navigations-view', {
          invisible: currentNavTab !== NavTabItemId.CONVERSATIONS,
        })}
      >
        <Conversations />
      </div>
      <div
        className={classNames('hz-navigations-view', {
          invisible: currentNavTab !== NavTabItemId.CONTACTS,
        })}
      >
        <Contacts />
      </div>
      <div
        className={classNames('hz-navigations-view', {
          invisible: currentNavTab !== NavTabItemId.NOTIFICATIONS,
        })}
      >
        <Notifications />
      </div>
    </>
  )
})
