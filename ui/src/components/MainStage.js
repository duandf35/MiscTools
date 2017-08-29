import React from 'react'
import Clock from './Clock'
import StopListContainer from "../containers/StopListContainer";

class MainStage extends React.Component {
    render() {
        return (
            <div style={{width: '100%'}}>
                <div style={{float: 'left', width: '80%'}}>map</div>
                <div style={{float: 'right'}}>
                    <div>
                        <Clock/>
                        <div>menu</div>
                    </div>
                    <StopListContainer/>
                </div>
            </div>
        )
    }
}

export default MainStage
