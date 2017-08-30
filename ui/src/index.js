import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
import DevTools from './devTools'
import monitor from './reducers'
import MainStage from './components/MainStage'

let store = createStore(monitor, DevTools.instrument());

// let store = createStore(
//     monitor,
//     compose(
//         // allow dispatch pass function
//         applyMiddleware(thunk),
//         DevTools.instrument()
//     )
// );

render(
    <Provider store={store}>
        <div>
            <MainStage/>
            <DevTools/>
        </div>
    </Provider>,
    document.getElementById('tt-ui')
);
