import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import DevTools from './devTools'
import monitor from './reducers'
import MainStage from './components/MainStage'
import { fetchRoutes } from './actions/routeAction'

let store = createStore(
    monitor,
    compose(
        // allow dispatch function
        applyMiddleware(thunk),
        DevTools.instrument()
    )
);

render(
    <Provider store={store}>
        <div>
            <MainStage/>
            <DevTools/>
        </div>
    </Provider>,
    document.getElementById('tt-ui')
);

// initialization
store.dispatch(fetchRoutes());
