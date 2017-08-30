import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Stop from '../components/Stop'
import { addStop } from '../actions'

class StopList extends React.Component {
    constructor() {
        super();
        this.stops = [];
    }

    render() {
        return(
            <ul>
                {this.stops.map(stop => (
                    <Stop key={stop.id} {...stop}/>
                ))}
            </ul>
        )
    }
}

StopList.propTypes = {
    stops: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            coordinate: PropTypes.arrayOf(PropTypes.number).isRequired
        }).isRequired
    ).isRequired
};

const mapStateToProps = (state) => {
    return {
        route: state.data.route,
        name: state.data.name,
        coordinate: state.data.coordinate
    }
};

export default connect(mapStateToProps)(StopList)
