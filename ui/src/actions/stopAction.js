import axios from 'axios'

let nextStopId = 0;

export const ADD_STOP_REQUEST = 'ADD_STOP_REQUEST';
export const ADD_STOP_SUCCESS = 'ADD_STOP_SUCCESS';
export const ADD_STOP_FAILURE = 'ADD_STOP_FAILURE';

export const fetchStopRequest = (req) => {
    return {
        type: ADD_STOP_REQUEST,
        req
    }
};

export const fetchStopSuccess = (req, data) => {
    return {
        type: ADD_STOP_SUCCESS,
        req,
        id: nextStopId++,
        stops: data
    }
};

export const fetchStopFailure = (req, err) => {
    return {
        type: ADD_STOP_FAILURE,
        req,
        error: err
    }
};

export function fetchStops(req) {

    return (dispatch) => {
        dispatch(fetchStopRequest(req));

        return axios.get('/api/stops')
            .then(resp => resp.data, err => dispatch(fetchStopFailure(req, err)))
            .then(data => dispatch(fetchStopSuccess(req, data)))
    }
}
