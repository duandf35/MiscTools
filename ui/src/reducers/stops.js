import { ADD_STOP_REQUEST, ADD_STOP_SUCCESS, ADD_STOP_FAILURE } from '../actions/stopAction';

const stops = (state, action) => {
    switch (action.type) {
        case ADD_STOP_REQUEST:
        case ADD_STOP_SUCCESS:
        case ADD_STOP_FAILURE:
        default:
            return state
    }
};

export default stops
