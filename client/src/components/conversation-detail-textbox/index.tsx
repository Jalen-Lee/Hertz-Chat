import React, {MouseEventHandler, useRef, useState, useEffect} from "react";
import {Tooltip, Popover,message} from 'antd';
import Button from '@mui/material/Button';


import './index.scss'
import Icon from "../Icon";

import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart'

interface OptionButtonProp {
  title: string,
  icon: string,
  onClick?: MouseEventHandler,
  onFocus?: MouseEventHandler,
  onMouseLeave?: MouseEventHandler,
  onMouseEnter?: MouseEventHandler
}

const OptionButton = function (props: OptionButtonProp) {
  const {title, icon, onClick} = props
  return (
    <Tooltip title={title}>
      <div className='input-bar-option-btn' onClick={onClick}>
        <Icon type={icon} style={{fontSize: '24px'}}/>
      </div>
    </Tooltip>
  )
}


function EditArea({ submit }: {
  submit:(val:string)=>void
}) {
  console.log('EditArea渲染')
  const inputRef = useRef<HTMLPreElement>(null)
  const [content, setContent] = useState('')

  const onInput: React.FormEventHandler<HTMLPreElement> = function (e) {
    const {current} = inputRef
    let nativeEvent = e.nativeEvent as InputEvent
    if (!current || nativeEvent.isComposing) return
    console.log('单词输入中')
    setContent(current.innerText)
  }

  const onCompositionEnd: React.CompositionEventHandler<HTMLPreElement> =
    function (e) {
      const {current} = inputRef
      console.log('汉字输入')
      current && setContent(current.innerText)
    }

  const onKeyDown: React.KeyboardEventHandler<HTMLPreElement> = function (e) {
    // console.log('键盘按下', e)
    let {key, ctrlKey} = e
    const {current} = inputRef
    if (!current) return
    switch (key) {
      case 'Enter':
        e.preventDefault()
        if (!ctrlKey) {
          if(current.innerText!=='\n'){
            submit(current.innerText)
            current.innerHTML = '<div><br/></div>'
          }
        } else {
          console.log('换行')
          current.innerHTML += '<div><br/></div>'
          let o = current.lastChild
          let sel = window.getSelection()
          let range = document.createRange()
          range.selectNodeContents(current)
          range.collapse(false)
          range.setEndAfter(o as Node)
          range.setStartAfter(o as Node)
          sel?.removeAllRanges()
          sel?.addRange(range)
          current.scrollTop = current.scrollHeight
        }
        break
      default:
        break
    }
  }

  const onKeyUp: React.KeyboardEventHandler<HTMLPreElement> = function (e) {
    let {key, ctrlKey} = e
  }

  return (
    <pre
      id='editArea'
      contentEditable='true'
      onCompositionEnd={onCompositionEnd}
      onInput={onInput}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      ref={inputRef}
      suppressContentEditableWarning
    >
        <div>
          <br/>
        </div>
    </pre>
  )
}

export default function ConversationDetailTextBox(props:{
  onSubmit?:(val:string)=>void
}) {
  const {onSubmit} = props
  console.log('textbox渲染')
  function sendFile() {
    message.info('功能正在开发中~')
    console.log("发送文件")
  }

  function sendImage() {
    message.info('功能正在开发中~')
    console.log("发送图片")
  }

  function sendEmoji() {
    message.info('功能正在开发中~')
    console.log('发送表情')
  }

  return (
    <div className={'conversation-detail-textbox'}>
      <div className={'input-bar-header'}>
        <div className='input-bar-header-left'>
          {/*<Popover content={<Picker set='apple'/>} trigger='click'>*/}
          {/*  <div>*/}
              <OptionButton title="发表情" icon='icon-xiaolian' onClick={sendEmoji}/>
          {/*  </div>*/}
          {/*</Popover>*/}
          <OptionButton title="发图片" icon='icon-tupian' onClick={sendImage}/>
          <OptionButton title="发文件" icon='icon-file' onClick={sendFile}/>
        </div>
        <div className='input-bar-header-right'></div>
      </div>

      <div className={'input-bar-main'}>
        <EditArea submit={onSubmit!}/>
      </div>
      {/*<div className={'input-bar-footer'}>*/}
      {/*  <Button variant="contained">发送</Button>*/}
      {/*</div>*/}
    </div>
  )
}
