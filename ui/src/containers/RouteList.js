import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { PropTypes } from 'prop-types'
import Route from '../components/Route'
import { fetchRoutes, selectRoute } from '../actions/routeAction'
import { fetchStops } from '../actions/stopAction';

class RouteList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const { fetchRoutes } = this.props;
        fetchRoutes()
    }

    render() {
        const { routes, onClick } = this.props;
        return (
            <ul>
                {routes.map(route =>
                    <Route key={route.id} {...route} onClick={() => onClick(route.id, route.routeId)}/>
                )}
            </ul>
        )
    }
}

RouteList.propTypes = {
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            selected: PropTypes.bool.isRequired,
            routeId: PropTypes.string.isRequired,
            longName: PropTypes.string.isRequired
        }).isRequired,
    ).isRequired,
    onClick: PropTypes.func.isRequired
};

// the key name is the export name of the reducer
const mapStateToProps = ({ routes }) => ({ routes });

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (id, routeId) => {
            dispatch(selectRoute(id));
            dispatch(fetchStops(routeId));
        },
        // pass func into the component
        ...bindActionCreators({ fetchRoutes }, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteList)
