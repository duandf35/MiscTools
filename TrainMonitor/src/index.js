import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import DevTools from './devTools'

// let store = createStore(todoApp, DevTools.instrument())
//
// render(
//     <Provider store={store}>
//         <div>
//             <DevTools />
//         </div>
//     </Provider>,
//     document.body
// )

render(
    <div>Train Monitor</div>,
    document.body
)
