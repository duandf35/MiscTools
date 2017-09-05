import {
    ADD_STOP_REQUEST,
    ADD_STOP_SUCCESS,
    ADD_STOP_FAILURE,
    SELECT_STOP
} from '../actions/stopAction';

const stop = (state = {}, action) => {
    switch (action.type) {
        case SELECT_STOP:
            if (state.id !== action.id) {
                return state;
            }

            return Object.assign({}, state, {
                selected: !state.selected
            });
        default:
            return state;
    }
};

const stops = (state = [], action) => {
    switch (action.type) {
        case ADD_STOP_REQUEST:
            return state;
        case ADD_STOP_SUCCESS:
            return action.stops;
        case ADD_STOP_FAILURE:
            return state;
        case SELECT_STOP:
            return state.map(t => stop(t, action));
        default:
            return state;
    }
};

export default stops
