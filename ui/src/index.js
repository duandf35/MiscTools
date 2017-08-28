import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import DevTools from './devTools'
import monitor from './reducers/monitor'
import MainStage from './components/MainStage'

let store = createStore(monitor, DevTools.instrument())

render(
    <Provider store={store}>
        <div>
            <MainStage/>
            <DevTools/>
        </div>
    </Provider>,
    document.getElementById('tt-ui')
)
