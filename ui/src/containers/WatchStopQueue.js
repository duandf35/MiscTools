import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { updateStopSelection } from '../actions/stopAction'

class WatchStopQueue extends React.Component {
    constructor(props) {
        super(props)
    }

    // TODO: figure out an alternative way to detect new state for maintaining a queue without React
    componentDidUpdate() {
        const { watchStops, dispatch } = this.props;
        dispatch(updateStopSelection(watchStops))
    }

    render() {
        return <div/>
    }
}

WatchStopQueue.propTypes = {
    watchStops: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired
};

const mapStateToProps = (state) => {
    return { watchStops: state.watchStops }
};

const mapDispatchToProps = (dispatch) => {
    return { dispatch: dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchStopQueue)
