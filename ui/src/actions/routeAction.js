import axios from 'axios'

let nextRouteId = 0;

export const ADD_ROUTE_REQUEST = 'ADD_ROUTE_REQUEST';
export const ADD_ROUTE_SUCCESS = 'ADD_ROUTE_SUCCESS';
export const ADD_ROUTE_FAILURE = 'ADD_ROUTE_FAILURE';

export const fetchRouteRequest = (req) => {
    return {
        type: ADD_ROUTE_REQUEST,
        req
    }
};

export const fetchRouteSuccess = (req, data) => {
    return {
        type: ADD_ROUTE_SUCCESS,
        req,
        id: nextRouteId++,
        stops: data
    }
};

export const fetchRouteFailure = (req, err) => {
    return {
        type: ADD_ROUTE_FAILURE,
        req,
        error: err
    }
};

export function fetchRoutes(req) {

    return (dispatch) => {
        dispatch(fetchRouteRequest(req));

        return axios.get('/api/routes')
            .then(resp => resp.data, err => dispatch(fetchRouteFailure(req, err)))
            .then(data => dispatch(fetchRouteSuccess(req, data)))
    }
}
