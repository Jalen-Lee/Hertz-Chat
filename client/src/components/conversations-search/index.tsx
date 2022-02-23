import React, { useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import SearchIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel'
import './index.scss'

export default observer(function ConversationSearchBar() {

  const [searchVal, setSearchValue] = useState('0')
  const inputEl = useRef(null);


  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value
    setSearchValue(value)
    // console.log(value)
  }

  function onClear(e: React.MouseEvent<HTMLDivElement>) {
    const el = inputEl.current as any
    el.value = ''
    setSearchValue('')
  }

  return (
    <div className='conversation-search-container'>
      <div className='search-icon icon'>
        <SearchIcon />
      </div>
      <input
        type='text'
        className='input-area'
        placeholder='搜索'
        ref={inputEl}
        onChange={(e) => onChange(e)}
      />
      <div className={`clear-icon icon ${searchVal.length > 0 && 'show'}`} onClick={(e) => onClear(e)}>
        <CancelIcon fontSize={'small'}/>
      </div>
    </div>
  )
})
