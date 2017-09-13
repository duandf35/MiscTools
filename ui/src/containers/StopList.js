import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { store } from '../store'
import Stop from '../components/Stop'
import { updateWatchStopQueue, updateStopSelection } from '../actions/stopAction'

const StopList = ({ stops, onClick }) => (
    <ul>
        {stops.map(stop =>
            <Stop key={stop.id} {...stop} onClick={() => onClick(stop.stopId)}/>
        )}
    </ul>
);

// if the queue is changed, dispatch the update action
let cur;
store.subscribe(() => {
    let prev = cur;
    cur = store.getState().watchStops;

    if (cur !== prev) {
        store.dispatch(updateStopSelection(cur))
    }
});

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

const mapStateToProps = ({ stops }) => ({ stops });

// update the queue
const mapDispatchToProps = (dispatch) => {
  return {
      onClick: (stopId) => {
          dispatch(updateWatchStopQueue(stopId))
      }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StopList)
