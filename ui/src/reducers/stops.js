import { ADD_STOP_REQUEST, ADD_STOP_SUCCESS, ADD_STOP_FAILURE } from '../actions/stopAction';

const stops = (state = [], action) => {
    switch (action.type) {
        case ADD_STOP_REQUEST:
            return state;
        case ADD_STOP_SUCCESS:
            return action.stops;
        case ADD_STOP_FAILURE:
            return state;
        default:
            return state;
    }
};

export default stops
