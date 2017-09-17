import { combineReducers } from 'redux'
import { stops, watchStops } from './stops'
import routes from './routes'
import trips from './trips'

const monitor = combineReducers({
    stops,
    watchStops,
    routes,
    trips
});

export default monitor
