import React from 'react'
import { Empty, EmptyProps } from 'antd'
import './index.scss'

import NoDataImg from '../../assets/imgs/no_data.png'
import NullDataImg from '../../assets/imgs/null_data.png'
import NoMsgImg from '../../assets/imgs/no_msg.png'

export enum IEmptyType{
  NO_DATA = 'no-data',
  NULL_DATA = 'null-data',
  NO_MSG = 'no-msg'
}

export interface IEmptyProps extends EmptyProps {
  type?: IEmptyType
  custom?: boolean
  children?: React.ReactNode
}

const images = {
  [IEmptyType.NO_DATA]:NoDataImg,
  [IEmptyType.NULL_DATA]:NullDataImg,
  [IEmptyType.NO_MSG]:NoMsgImg
}



export default function IEmpty(props:IEmptyProps){
  if(props.custom){
    return (
      <div className='empty-wrap'>
        {props.children}
      </div>
    )
  }else{
    let {type,image,imageStyle,description} = props
    imageStyle = imageStyle || {
      height: '50%',
    }
    description = description || false
    if(!type && !image){
      type = IEmptyType.NO_DATA
      image = images[type]
    }else if((type && !image) || (type && image)){
      image = images[type]
    }else{
      imageStyle = {
        height: 'auto',
      }
    }
    return (
      <div className='empty-wrap'>
        <Empty
          image={image}
          imageStyle={imageStyle}
          description={description}
        />
      </div>
    )
  }
}
