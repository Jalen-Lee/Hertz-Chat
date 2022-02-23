import { useState, useEffect, useLayoutEffect, useCallback } from 'react'

interface useMediaArgs {
  type: 'userMedia' | 'displayMedia',
  constraints: DisplayMediaStreamConstraints | MediaStreamConstraints
}

function getDisplayMedia(constraints:DisplayMediaStreamConstraints):Promise<MediaStream>{
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getDisplayMedia(constraints).then(mediaStream=>{
      resolve(mediaStream)
    }).catch(err=>{
      reject(err)
    })
  })
}

function getUserMedia(constraints:MediaStreamConstraints):Promise<MediaStream>{
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia(constraints).then(mediaStream=>{
      resolve(mediaStream)
    }).catch(err=>{
      reject(err)
    })
  })
}


export default function useMedia({ type, constraints }: useMediaArgs):{
  stream:MediaStream|undefined,
  setVideoEnable:()=>void,
  setVideoDisenable:()=>void,
  switchVideoEnable:()=>void,
  setAudioEnable:()=>void,
  setAudioDisenable:()=>void,
  switchAudioEnable:()=>void,
} {
  const [stream,setStream] = useState<MediaStream>()

  const setVideoEnable = useCallback(()=>{
    if(stream){
      const tracks = stream.getVideoTracks()
      tracks.forEach(track=>{
        if(!track.enabled) track.enabled = true
      })
    }
  },[stream])

  const setVideoDisenable = useCallback(()=>{
    if(stream){
      const tracks = stream.getVideoTracks()
      tracks.forEach(track=>{
        if(track.enabled) track.enabled = false
      })
    }
  },[stream])

  const switchVideoEnable = useCallback(()=>{
    if(stream){
      const tracks = stream.getVideoTracks()
      tracks.forEach(track=>{
        track.enabled = !track.enabled
      })
    }
  },[stream])

  const setAudioEnable = useCallback(()=>{
    if(stream){
      const tracks = stream.getAudioTracks()
      tracks.forEach(track=>{
        if(!track.enabled) track.enabled = true
      })
    }
  },[stream])

  const setAudioDisenable = useCallback(()=>{
    if(stream){
      const tracks = stream.getAudioTracks()
      tracks.forEach(track=>{
        if(track.enabled) track.enabled = false
      })
    }
  },[stream])

  const switchAudioEnable = useCallback(()=>{
    if(stream){
      const tracks = stream.getAudioTracks()
      tracks.forEach(track=>{
        track.enabled = !track.enabled
      })
    }
  },[stream])



  useEffect(()=>{
    console.log(11)
    if(type === 'userMedia'){
      getUserMedia(constraints).then(stream=>{
        setStream(stream)
      }).catch(err=>{
        console.log(err)
      })
    }else{
      getDisplayMedia(constraints).then(stream=>{
        setStream(stream)
      }).catch(err=>{
        console.log(err)
      })
    }
  },[])

  return {
    stream,
    setVideoEnable,
    setVideoDisenable,
    switchVideoEnable,
    setAudioEnable,
    setAudioDisenable,
    switchAudioEnable,
  }
}

