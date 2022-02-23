import React, { useEffect, useLayoutEffect, useRef } from 'react'
import './index.scss'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import useMedia from '../../hooks/useMedia'


function MediaPanelFrond() {
  const videoEl = useRef<HTMLVideoElement>(null);
  const {stream,switchVideoEnable,switchAudioEnable} = useMedia({
    type: 'userMedia',
    constraints: {
      audio: true,
      video: {
        width:448,
        height:252
      },
    },
  })
  // console.log('stream', stream)
  // console.log('videoEl.current',videoEl.current)
  useLayoutEffect(()=>{
    videoEl.current!.srcObject = stream as MediaProvider
  },[stream])
  return (
    <div className='media-panel-frond-wrapper'>
      <div className='media-panel-frond-header'>
        <div className='media-panel-frond-close'>
          <CloseIcon />
        </div>
      </div>
      <div className='media-panel-frond-main'>
        {/*<div className='media-cover'>*/}

        {/*</div>*/}
        <video ref={videoEl} autoPlay className='media-panel-frond-video'/>
      </div>
      <div className='media-panel-frond-footer'>
        <button onClick={()=>switchVideoEnable()}>关闭视频</button>
        <button onClick={()=>switchAudioEnable()}>关闭音频</button>
      </div>
    </div>
  )
}


export default function MediaPanel() {
  return (
    <MediaPanelFrond />
  )
}
