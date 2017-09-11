import axios from 'axios'

let nextRouteId = 0;

export const ADD_ROUTE_REQUEST = 'ADD_ROUTE_REQUEST';
export const ADD_ROUTE_SUCCESS = 'ADD_ROUTE_SUCCESS';
export const ADD_ROUTE_FAILURE = 'ADD_ROUTE_FAILURE';
export const SELECT_ROUTE = 'SELECT_ROUTE';

export const fetchRouteRequest = () => {
    return {
        type: ADD_ROUTE_REQUEST
    }
};

export const fetchRoutesSuccess = (routes) => {
    return {
        type: ADD_ROUTE_SUCCESS,
        routes: routes.map(route => {
            return {
                id: nextRouteId++,
                selected: false,
                ...route
            }
        })
    }
};

export const fetchRouteFailure = (error) => {
    return {
        type: ADD_ROUTE_FAILURE,
        error
    }
};

export const selectRoute = (id) => {
    return {
        type: SELECT_ROUTE,
        id
    }
};

export function fetchRoutes() {

    return (dispatch) => {
        dispatch(fetchRouteRequest());

        return axios.get('/api/routes')
            .then(resp => toRoutes(resp.data), err => dispatch(fetchRouteFailure(err)))
            .then(routes => dispatch(fetchRoutesSuccess(routes)))
    }
}

function toRoutes(routes) {
    return routes.map(route => {
        return {
            routeId: route['route_id'],
            longName: route['route_long_name']
        }
    });
}
