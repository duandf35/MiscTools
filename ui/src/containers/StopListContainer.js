import React from 'react'
import { connect } from 'react-redux'
import { addStop } from '../actions'
import StopList from '../components/StopList'

const mapStateToProps = (state) => {
    return {
        // TODO: retrieve 'Stop' fields from state.data returned by reducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // TODO: dispatch an action during initialization
    }
};

const StopListContainer = connect(mapStateToProps)(StopList);

export default StopListContainer
