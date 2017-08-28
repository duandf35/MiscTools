import React from 'react'
import Clock from './Clock'

const MainStage = () => (
    <div style={{width: '100%'}}>
        <div style={{float: 'left', width: '80%'}}>map</div>
        <div style={{float: 'right'}}>
            <div>
                <Clock/>
                <div>menu</div>
            </div>
        </div>
    </div>
)

export default MainStage
