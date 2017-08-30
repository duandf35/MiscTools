import React from 'react'
import { connect } from 'react-redux'
// import { PropTypes } from 'prop-types'
import Route from '../components/Route'
import axios from 'axios'

class RouteList extends React.Component {
    constructor() {
        super();
        this.state = { routes: [] }
    }

    componentDidMount() {
        axios.get('/api/routes').then(resp => {
            const routes = resp.data;
            this.setState({ routes })
        }).catch(err => {
            console.log(err)
        });
    }

    render() {
        return(
            <ul>
                {this.state.routes.map(route => (
                    <Route key={route.id} {...route}/>
                ))}
            </ul>
        )
    }
}

// RouteList.propTypes = {
//     routes: PropTypes.arrayOf(
//         PropTypes.shape({
//             routeId: PropTypes.string.isRequired,
//             name: PropTypes.string.isRequired
//         }).isRequired
//     ).isRequired
// };

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(RouteList)
