import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import { Row, Col } from 'antd'
import { Navigations, NavigationsView } from '../../layout'

import './index.scss'

export default function Chat() {
  return (
    <div id="hz-chat-view">
      <div className="bg" />
      <div className="hz-chat-panel">
        <div className="hz-chat-panel-col-left">
          <Navigations />
        </div>
        <div className="hz-chat-panel-col-right">
          <NavigationsView />
        </div>
        {/*<Row wrap={false}>*/}
        {/*  <Col span={2}>*/}
        {/*    <Navigations />*/}
        {/*  </Col>*/}
        {/*  <Col span={22}>*/}
        {/*    <NavigationsView />*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        {/*<Grid container height="100%" wrap={'nowrap'}>*/}
        {/*  <Grid item width={'80px'}></Grid>*/}
        {/*  <Grid item xs>*/}
        {/*    <NavigationsView />*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
      </div>
    </div>
  )
}
