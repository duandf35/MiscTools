const stop = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_STOP':
            return {
                id: action.id,
                data: action.data
            };
        default:
            return state
    }
};

const stops = (state = [], action) => {
    switch (action.type) {
        case 'ADD_STOP':
            return [
                ...state,
                stop(undefined, action)
            ];
        default:
            return state
    }
};

export default stops
