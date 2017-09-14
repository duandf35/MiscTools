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

export const storeSubscriber = (target, actionCreator) => {
    let nextState;

    if (target in store.getState()) {
        store.subscribe(() => {
            let currentState = nextState;
            nextState = store.getState()[target];

            if (nextState !== currentState) {
                store.dispatch(actionCreator(nextState));
            }
        });
    }
};
