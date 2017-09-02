import {
    ADD_STOP_REQUEST,
    ADD_STOP_SUCCESS,
    ADD_STOP_FAILURE,
    TOGGLE_STOP
} from '../actions/stopAction';

const stop = (state = {}, action) => {
    switch (action.type) {
        case ADD_STOP_SUCCESS:
            return {
                id: action.id,
                selected: false,
                routeId: action.routeId,
                ...action.stop
            };
        case TOGGLE_STOP:
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
            return [...state, stop(undefined, action)];
        case ADD_STOP_FAILURE:
            // TODO: handle error
            return state;
        case TOGGLE_STOP:
            return state.map(t => stop(t, action));
        default:
            return state;
    }
};

export default stops
