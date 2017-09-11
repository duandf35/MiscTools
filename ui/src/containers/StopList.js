import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Stop from '../components/Stop'
import { updateWatchStopQueue } from '../actions/stopAction'

const StopList = ({ stops, onClick }) => (
    <ul>
        {stops.map(stop =>
            <Stop key={stop.id} {...stop} onClick={() => onClick(stop.stopId)}/>
        )}
    </ul>
);

StopList.propTypes = {
    stops: PropTypes.arrayOf(
        PropTypes.shape({
            selected: PropTypes.bool.isRequired,
            stopName: PropTypes.string.isRequired,
            coordinate: PropTypes.arrayOf(PropTypes.number).isRequired
        }).isRequired
    ).isRequired,
    onClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return { stops: state.stops };
};

const mapDispatchToProps = (dispatch) => {
  return {
      onClick: (stopId) => {
          dispatch(updateWatchStopQueue(stopId))
      }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StopList)
