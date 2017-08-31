import { ADD_ROUTE_REQUEST, ADD_ROUTE_SUCCESS, ADD_ROUTE_FAILURE } from '../actions/routeAction';


const stops = (state, action) => {
    switch (action.type) {
        case ADD_ROUTE_REQUEST:
        case ADD_ROUTE_SUCCESS:
        case ADD_ROUTE_FAILURE:
        default:
            return state
    }
};

export default stops
