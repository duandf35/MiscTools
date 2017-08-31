import { combineReducers } from 'redux'
import stops from './stops'
import routes from './routes'

const monitor = combineReducers({
    stops,
    routes
});

export default monitor
