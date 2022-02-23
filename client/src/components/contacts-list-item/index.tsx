import React from 'react'
import { observer } from 'mobx-react-lite'
import './index.scss'



export default observer(function(prop: {
  info:any,
  onSelect:(contact:any)=>void
}) {
  const {info,onSelect} = prop
  console.log(onSelect)
  return (
    <div className='contacts-item' onClick={()=>onSelect(info)}>
      <div className='avatar'>
        <img src={info.icon} alt={info.name} />
      </div>
      <div className='name'>{info.name}</div>
    </div>
  )
})
