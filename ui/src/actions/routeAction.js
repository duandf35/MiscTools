import axios from 'axios'
import _ from 'lodash'

let nextRouteId = 0;

export const ADD_ROUTE_REQUEST = 'ADD_ROUTE_REQUEST';
export const ADD_ROUTE_SUCCESS = 'ADD_ROUTE_SUCCESS';
export const ADD_ROUTE_FAILURE = 'ADD_ROUTE_FAILURE';
export const TOGGLE_ROUTE = 'SELECT_ROUTE';

export const fetchRouteRequest = () => {
    return {
        type: ADD_ROUTE_REQUEST
    }
};

export const fetchRouteSuccess = (route) => {
    return {
        type: ADD_ROUTE_SUCCESS,
        id: nextRouteId++,
        route: route
    }
};

export const fetchRouteFailure = (err) => {
    return {
        type: ADD_ROUTE_FAILURE,
        error: err
    }
};

export const selectRoute = (id) => {
    return {
        type: TOGGLE_ROUTE,
        id: id,
        selected: true
    }
};

export function fetchRoutes() {

    return (dispatch) => {
        dispatch(fetchRouteRequest());

        return axios.get('/api/routes')
            .then(resp => toRoutes(resp.data), err => dispatch(fetchRouteFailure(err)))
            .then(routes =>
                routes.forEach(
                    route => dispatch(fetchRouteSuccess(route))
                )
            )
    }
}

function toRoutes(routes) {
    return _.map(routes, (route) => {
        return { shortName: route['route_id'], longName: route['route_long_name'] }
    });
}
