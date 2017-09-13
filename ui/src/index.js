import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import DevTools from './devTools'
import MainStage from './components/MainStage'
import { store } from './store'

render(
    <Provider store={store}>
        <div>
            <MainStage/>
            <DevTools/>
        </div>
    </Provider>,
    document.getElementById('tt-ui')
);
