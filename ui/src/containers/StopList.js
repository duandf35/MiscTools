import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Stop from '../components/Stop'
import { addStop } from '../actions'

const StopList = ({ stops }) => (
    <ul>
        {stops.map(stop =>
            <Stop key={stop.id} {...stop}/>
        )}
    </ul>
);

StopList.propTypes = {
    stops: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            coordinate: PropTypes.arrayOf(PropTypes.number).isRequired
        }).isRequired
    ).isRequired
};

const mapStateToProps = (state) => {
    return { stops: state.stops };
};

export default connect(mapStateToProps)(StopList)
