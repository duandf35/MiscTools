import axios from 'axios'

let nextTripId = 0;

export const ADD_TRIP_REQUEST = 'ADD_TRIP_REQUEST';
export const ADD_TRIP_SUCCESS = 'ADD_TRIP_SUCCESS';
export const ADD_TRIP_FAILURE = 'ADD_TRIP_FAILURE';

export const fetchTripsRequest = (stopId, routeId) => {
    return {
        type: ADD_TRIP_REQUEST,
        stopId,
        routeId
    }
};

export const fetchTripsSuccess = (stopId, routeId, trips) => {
    return {
        type: ADD_TRIP_SUCCESS,
        stopId,
        routeId,
        trips: trips.map(trip => {
            return {
                id: nextTripId++,
                ...trip
            }
        })
    }
};

export const fetchTripsFailure = (stopId, routeId, error) => {
    return {
        type: ADD_TRIP_FAILURE,
        stopId,
        routeId,
        error
    }
};

export const fetchTrips = (stopId, routeId) => {
    return (dispatch) => {
        dispatch(fetchTripsRequest(stopId, routeId));

        return axios.get('/api/stop_times/' + routeId + '/' + stopId)
            .then(resp => toTrips(resp.data), err => dispatch(fetchTripsFailure(stopId, routeId, err)))
            .then(trips => dispatch(fetchTripsSuccess(stopId, routeId, trips)))
    }
};

function toTrips(trips) {
    return trips.map(trip => {
        return {
            routeId: trip['route_id'],
            tripId: trip['trip_id'],
            stopId: trip['stop_id'],
            arrival: trip['arrival_time'],
            departure: trip['departure_time'],
            sequence: trip['stop_sequence'],
            headSign: trip['trip_headsign']
        }
    })
}
