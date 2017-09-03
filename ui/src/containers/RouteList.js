import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Route from '../components/Route'
import { selectRoute } from '../actions/routeAction'

// { routes } extracts the 'routes' field from Redux state
const RouteList = ({ routes, onClick }) => (
    <ul>
        {routes.map(route =>
            <Route key={route.id} {...route} onClick={() => onClick(route.id)}/>
        )}
    </ul>
);

RouteList.propTypes = {
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            selected: PropTypes.bool.isRequired,
            routeId: PropTypes.string.isRequired,
            longName: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
};

// the key name is the export name of the reducer
const mapStateToProps = (state) => {
    return { routes: state.routes };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (id) => {
            dispatch(selectRoute(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteList)
