import {
    ADD_ROUTE_REQUEST,
    ADD_ROUTE_SUCCESS,
    ADD_ROUTE_FAILURE,
    TOGGLE_ROUTE
} from '../actions/routeAction';

// state refers to the individual route
const route = (state = {}, action) => {
    switch (action.type) {
        case ADD_ROUTE_REQUEST:
            return state;
        case ADD_ROUTE_SUCCESS:
            return {
                id: action.id,
                selected: false,
                ...action.route,
            };
        case ADD_ROUTE_FAILURE:
            return state;
        case TOGGLE_ROUTE:
            if (state.id !== action.id) {
                return state;
            }

            return Object.assign({}, state, {
                selected: !state.selected
            });
        default:
            return state
    }
};

const routes = (state = [], action) => {
    switch (action.type) {
        case ADD_ROUTE_REQUEST:
            return state;
        case ADD_ROUTE_SUCCESS:
            return [...state, route(undefined, action)];
        case ADD_ROUTE_FAILURE:
            return state;
        case TOGGLE_ROUTE:
            return state.map(t => route(t, action));
        default:
            return state
    }
};

export default routes
