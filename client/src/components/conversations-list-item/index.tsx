import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import Badge from '@mui/material/Badge'
import './index.scss'

interface ConversationItemProps {
  data: any
  onChoose: (e: React.MouseEvent<HTMLDivElement>, conversation: any) => void
  onClose: (e: React.MouseEvent<HTMLDivElement>, conversation: any) => void
  hasChoose: boolean | undefined
}

export default function ConversationItem(
  props: ConversationItemProps,
): JSX.Element {
  const { data, hasChoose, onChoose, onClose } = props
  return (
    <div
      className={
        hasChoose
          ? 'conversation-item-container chosen'
          : 'conversation-item-container'
      }
      onClick={(e) => onChoose(e, data)}
    >
      <div
        className="close-btn"
        onClick={(e) => {
          e.stopPropagation()
          onClose(e, data)
        }}
      >
        <CloseIcon fontSize={'small'} />
      </div>
      <div className="conversation-item-body">
        <div className="conversation-item-body-avatar">
          <img src={data.avatar} alt={data.name + '头像'} />
        </div>
        <div className="conversation-item-body-content">
          <div className="row-1">
            <div className="name text-ellipsis">{data.name}</div>
            <div className="unread-count"></div>
          </div>
          <div className="row-2">
            <div className="summary text-ellipsis">{data.hotMsg}</div>
            <div className="date">{data.postDate}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
