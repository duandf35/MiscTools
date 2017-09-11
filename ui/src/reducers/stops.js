import {
    ADD_STOP_REQUEST,
    ADD_STOP_SUCCESS,
    ADD_STOP_FAILURE,
    UPDATE_WATCH_STOP_QUEUE,
    UPDATE_STOP_SELECTION,
    WATCH_STOP_QUEUE_SIZE
} from '../actions/stopAction';

const watchStops = (state = [], action) => {
    switch (action.type) {
        case UPDATE_WATCH_STOP_QUEUE:
            let nextState = Object.assign([], state);
            nextState.push(action.stopId);

            while(nextState.length > WATCH_STOP_QUEUE_SIZE) {
                nextState.shift();
            }

            return nextState;
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
        case UPDATE_STOP_SELECTION:
            return state.map(t => {
                if (action.stopIds.includes(t.stopId)) {
                    return Object.assign({}, t, { selected: true })
                }

                return Object.assign({}, t, { selected: false });
            });
        default:
            return state;
    }
};

export { stops, watchStops }
