import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Route from '../components/Route'

class RouteList extends React.Component {
    constructor() {
        super();
        this.routes = [];
    }

    componentDidMount() {

    }

    render() {
        return(
            <ul>
                {this.routes.map(route => (
                    <Route key={route.id} {...route}/>
                ))}
            </ul>
        )
    }
}

RouteList.propTypes = {
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            routeId: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
};

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(RouteList)
