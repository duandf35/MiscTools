import { combineReducers } from 'redux'
import { stops, watchStops } from './stops'
import routes from './routes'

const monitor = combineReducers({
    stops,
    watchStops,
    routes
});

export default monitor
