import React from 'react'
import { Tooltip } from '@mui/material'
import './index.scss'
import { NavTabItemName } from '../../types/common.d'

interface Prop {
  id: NavTabItemName,
  title: string,
  isActive: boolean,
  onClick: (e: React.MouseEvent<HTMLDivElement>, id: NavTabItemName) => void,
  children: JSX.Element
}


export default function NavTabItem({
  id, title, isActive, onClick, children
}: Prop): JSX.Element {
  return (

    <Tooltip title={title} arrow placement='left'>
      <div
        id={id}
        className={isActive ? 'nav-tab-item active' : 'nav-tab-item'}
        onClick={
          (e) => onClick(e, id)
        }
      >
        {children}
      </div>
    </Tooltip>
  )
}
