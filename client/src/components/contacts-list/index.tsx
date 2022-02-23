import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import './index.scss'
import classNames from 'classnames'

import ContactsItem from '../contacts-list-item'


import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useStore from '../../hooks/useStore'


const accordionSx = {
  backgroundColor: 'transparent',
  color: '#ffffff',
  border: 'none',
  boxShadow: 'none',
  '&.Mui-expanded': {
    margin: 0,
  },
  '&:first-of-type': {
    borderRadius: 0,
    border: 'none',
  },
  '&:last-of-type': {
    borderRadius: 0,
    border: 'none',
  },
}

interface Props{
  isShow:boolean,
  onContactChange:(contact:any)=>void
}

export default observer(function({ isShow,onContactChange }:Props) {

  console.log(onContactChange)
  const {userStore} = useStore()
  console.log('userStore',userStore)
  const {conversations} = userStore
  useEffect(()=>{

  },[])

  return (
    <div className={classNames('friend-list-container',{'invisible':!isShow})}>
      <Accordion sx={accordionSx}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />}
          id='panel1a-header'
        >
          <Typography>我的好友</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding:0}}>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={accordionSx}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />}
          id='panel2a-header'
        >
          <Typography>我的群聊</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
            conversations.map(i=>(
              <ContactsItem info={i} onSelect={onContactChange} key={i.id}/>
            ))
          }
        </AccordionDetails>
      </Accordion>
    </div>
  )
})
