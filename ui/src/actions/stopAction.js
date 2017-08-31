import axios from 'axios'

let nextStopId = 0;

export const ADD_STOP_REQUEST = 'ADD_STOP_REQUEST';
export const ADD_STOP_SUCCESS = 'ADD_STOP_SUCCESS';
export const ADD_STOP_FAILURE = 'ADD_STOP_FAILURE';

export const fetchStopRequest = (route) => {
    return {
        type: ADD_STOP_REQUEST,
        route
    }
};

export const fetchStopSuccess = (route, data) => {
    return {
        type: ADD_STOP_SUCCESS,
        route,
        id: nextStopId++,
        stops: data
    }
};

export const fetchStopFailure = (route, err) => {
    return {
        type: ADD_STOP_FAILURE,
        route,
        error: err
    }
};

export function fetchStops(route) {

    return (dispatch) => {
        dispatch(fetchStopRequest(route));

        return axios.get('/api/stops')
            .then(resp => resp.data, err => dispatch(fetchStopFailure(route, err)))
            .then(data => dispatch(fetchStopSuccess(route, data)))
    }
}
