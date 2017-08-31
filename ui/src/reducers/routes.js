import { ADD_ROUTE_REQUEST, ADD_ROUTE_SUCCESS, ADD_ROUTE_FAILURE } from '../actions/routeAction';

const routes = (state = [], action) => {
    switch (action.type) {
        case ADD_ROUTE_REQUEST:
            return state;
        case ADD_ROUTE_SUCCESS:
            let routes = [];
            action.routes.forEach(function(rawdata) {
                const { route_id: routeId, route_long_name: name} = rawdata;
                routes.push({ routeId: routeId, name: name });
            });
            return routes;
        case ADD_ROUTE_FAILURE:
            return state;
        default:
            return state
    }
};

export default routes
