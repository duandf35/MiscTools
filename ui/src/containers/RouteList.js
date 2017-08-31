import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Route from '../components/Route'

// TODO: how to do it in es6 class?

// { routes } extracts the 'routes' field from Redux state
const RouteList = ({ routes }) => (
    <ul>
        {routes.map((route, index) =>
            <Route key={index} {...route}/>
        )}
    </ul>
);

RouteList.propTypes = {
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            routeId: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
};

const mapStateToProps = (state) => {
    return { routes: state.routes };
};

export default connect(mapStateToProps)(RouteList)
