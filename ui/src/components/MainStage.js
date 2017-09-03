import React from 'react'
import Clock from './Clock'
import RouteList from "../containers/RouteList";
import StopList from "../containers/StopList";
import styles from 'spectre.css/dist/spectre.css'

class MainStage extends React.Component {
    render() {
        return (
            <div>
                <Clock/>
                <div className={styles['container']}>
                    <div className={styles['columns']}>
                        <div className={[styles['column'], styles['col-2']].join(' ')}>
                            <RouteList/>
                        </div>
                        <div className={[styles['column'], styles['col-2']].join(' ')}>
                            <StopList/>
                        </div>
                        <div className={[styles['column'], styles['col-8']].join(' ')}>
                            <div className={styles['empty']}>
                                <p className={[styles['empty-title'], styles['h5']].join(' ')}>Map not available</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainStage
