import React from 'react'
import Clock from './Clock'
import RouteList from '../containers/RouteList'
import StopList from '../containers/StopList'
import WatchStopQueue from '../containers/WatchStopQueue'
import spectre from 'spectre.css/dist/spectre.css'

class MainStage extends React.Component {
    render() {
        return (
            <div>
                <Clock/>
                <WatchStopQueue/>
                <div className={spectre['container']}>
                    <div className={spectre['columns']}>
                        <div className={[spectre['column'], spectre['col-2']].join(' ')}>
                            <RouteList/>
                        </div>
                        <div className={[spectre['column'], spectre['col-2']].join(' ')}>
                            <StopList/>
                        </div>
                        <div className={[spectre['column'], spectre['col-6']].join(' ')}>
                            <div className={spectre['empty']}>
                                <p className={[spectre['empty-title'], spectre['h5']].join(' ')}>Map not available</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainStage
