import {
    ADD_TRIP_REQUEST,
    ADD_TRIP_SUCCESS,
    ADD_TRIP_FAILURE
} from '../actions/tripAction';

const trips = (state = {}, action) => {
    switch (action.type) {
        case ADD_TRIP_REQUEST:
            return state;
        case ADD_TRIP_SUCCESS:
            let nextState = {};

            // Object.assign won't deep copy the nested fields
            Object.keys(state).forEach(key => {
                nextState[key] = [...state[key]]
            });

            nextState[action.stopId] = action.trips;

            return nextState;
        case ADD_TRIP_FAILURE:
            return state;
        default:
            return state;
    }
};

export default trips;
