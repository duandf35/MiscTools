import {
    ADD_ROUTE_REQUEST,
    ADD_ROUTE_SUCCESS,
    ADD_ROUTE_FAILURE,
    SELECT_ROUTE
} from '../actions/routeAction';

function selectOnlyOne(route, action) {
    if (route.id !== action.id) {
        return Object.assign({}, route, { selected: false })
    }

    return Object.assign({}, route, { selected: true });
}

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
            return state.map(r => selectOnlyOne(r, action));
        default:
            return state
    }
};

export default routes
