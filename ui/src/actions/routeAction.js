import axios from 'axios'

let nextRouteId = 0;

export const ADD_ROUTE_REQUEST = 'ADD_ROUTE_REQUEST';
export const ADD_ROUTE_SUCCESS = 'ADD_ROUTE_SUCCESS';
export const ADD_ROUTE_FAILURE = 'ADD_ROUTE_FAILURE';

export const fetchRouteRequest = () => {
    return {
        type: ADD_ROUTE_REQUEST
    }
};

export const fetchRouteSuccess = (data) => {
    return {
        type: ADD_ROUTE_SUCCESS,
        id: nextRouteId++,
        routes: data
    }
};

export const fetchRouteFailure = (err) => {
    return {
        type: ADD_ROUTE_FAILURE,
        error: err
    }
};

export function fetchRoutes() {

    return (dispatch) => {
        dispatch(fetchRouteRequest());

        return axios.get('/api/routes')
            .then(resp => resp.data, err => dispatch(fetchRouteFailure(err)))
            .then(data => dispatch(fetchRouteSuccess(data)))
    }
}
