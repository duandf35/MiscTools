let nextStopId = 0;

export const addStop = (data) => {
    return {
        type: 'ADD_STOP',
        id: nextStopId++,
        data
    }
};
