import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import DevTools from './devTools'
import monitor from './reducers'

export const store = createStore(
    monitor,
    compose(
        // allow dispatch function
        applyMiddleware(thunk),
        DevTools.instrument()
    )
);
