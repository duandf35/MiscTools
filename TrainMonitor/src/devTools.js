import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'

// https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md
const DevTools = createDevTools(
    <LogMonitor theme='tomorrow'/>
)

export default DevTools
