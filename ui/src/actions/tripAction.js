import axios from 'axios'

let nextTripId = 0;

export const ADD_TRIP_REQUEST = 'ADD_TRIP_REQUEST';
export const ADD_TRIP_SUCCESS = 'ADD_TRIP_SUCCESS';
export const ADD_TRIP_FAILURE = 'ADD_TRIP_FAILURE';

export const fetchTripsRequest = (stopId) => {
    return {
        type: ADD_TRIP_REQUEST,
        stopId
    }
};

export const fetchTripsSuccess = (stopId, trips) => {
    return {
        type: ADD_TRIP_SUCCESS,
        stopId,
        trips: trips.map(trip => {
            return {
                id: nextTripId++,
                ...trip
            }
        })
    }
};

export const fetchTripsFailure = (stopId, error) => {
    return {
        type: ADD_TRIP_FAILURE,
        stopId,
        error
    }
};

export const fetchTrips = (stopId) => {
    return (dispatch) => {
        dispatch(fetchTripsRequest(stopId));

        return axios.get('/api/stop_times/' + stopId)
            .then(resp => toTrips(resp.data), err => dispatch(fetchTripsFailure(stopId, err)))
            .then(trips => dispatch(fetchTripsSuccess(stopId, trips)))
    }
};

function toTrips(trips) {
    return trips.map(trip => {
        return {
            tripId: trip['trip_id'],
            stopId: trip['stop_id'],
            arrival: trip['arrival_time'],
            departure: trip['departure_time'],
            sequence: trip['stop_sequence']
        }
    })
}
