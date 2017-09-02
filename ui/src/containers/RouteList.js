import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Route from '../components/Route'

// { routes } extracts the 'routes' field from Redux state
const RouteList = ({ routes }) => (
    <ul>
        {routes.map(route =>
            <Route key={route.id} {...route}/>
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

export default connect(mapStateToProps)(RouteList)
