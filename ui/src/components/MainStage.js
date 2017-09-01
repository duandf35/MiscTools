import React from 'react'
import Clock from './Clock'
import RouteList from "../containers/RouteList";

class MainStage extends React.Component {
    render() {
        return (
            <div>
                <Clock/>
                <RouteList/>
            </div>
        )
    }
}

export default MainStage
