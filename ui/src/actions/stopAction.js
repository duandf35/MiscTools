import axios from 'axios'

let nextStopId = 0;

export const ADD_STOP_REQUEST = 'ADD_STOP_REQUEST';
export const ADD_STOP_SUCCESS = 'ADD_STOP_SUCCESS';
export const ADD_STOP_FAILURE = 'ADD_STOP_FAILURE';
export const SELECT_STOP = 'SELECT_STOP';

export const fetchStopRequest = (routeId) => {
    return {
        type: ADD_STOP_REQUEST,
        routeId
    }
};

export const fetchStopsSuccess = (stops) => {
    return {
        type: ADD_STOP_SUCCESS,
        stops: stops.map(stop => {
            return {
                id: nextStopId++,
                selected: false,
                ...stop
            }
        })
    }
};

export const fetchStopFailure = (routeId, error) => {
    return {
        type: ADD_STOP_FAILURE,
        routeId,
        error
    }
};

export const selectStop = (id) => {
    return {
        type: SELECT_STOP,
        selected: true,
        id
    }
};

export function fetchStops(routeId) {

    return (dispatch) => {
        dispatch(fetchStopRequest(routeId));

        return axios.get('/api/stops/' + routeId)
            .then(resp => toStops(resp.data), err => dispatch(fetchStopFailure(routeId, err)))
            .then(stops => dispatch(fetchStopsSuccess(stops)))
    }
}

function toStops(stops) {
    return stops.map(stop => {
        return {
            stopId: stop['stop_id'],
            routeId: stop['route_id'],
            stopName: stop['stop_name'],
            coordinate: [stop['stop_lat'], stop['stop_lon']]
        }
    })
}
