import {
    ADD_ROUTE_REQUEST,
    ADD_ROUTE_SUCCESS,
    ADD_ROUTE_FAILURE,
    SELECT_ROUTE
} from '../actions/routeAction';

const route = (state = {}, action) => {
    switch (action.type) {
        case SELECT_ROUTE:
            if (state.id !== action.id) {
                return Object.assign({}, state, {
                    selected: false
                })
            }

            return Object.assign({}, state, {
                selected: true
            });
        default:
            return state
    }
};

// state refers to the 'routes' field in the Redux store
const routes = (state = [], action) => {
    switch (action.type) {
        case ADD_ROUTE_REQUEST:
            return state;
        case ADD_ROUTE_SUCCESS:
            // return a new list of routes instead of appending to the state
            return action.routes;
        case ADD_ROUTE_FAILURE:
            return state;
        case SELECT_ROUTE:
            return state.map(t => route(t, action));
        default:
            return state
    }
};

export default routes
