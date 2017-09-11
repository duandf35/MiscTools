import React from 'react'
import moment from 'moment'
import spectre from 'spectre.css/dist/spectre.css'

// https://facebook.github.io/react/docs/state-and-lifecycle.html
class Clock extends React.Component {
    constructor() {
        super();
        this.timeFormat = 'h:mm:ss a, dddd, MM/DD/YYYY';
        this.state = {currentTime: moment().format(this.timeFormat)};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            currentTime: moment().format(this.timeFormat)
        })
    }

    render() {
        return (
            <div className={[spectre['toast'], spectre['toast-primary']].join(' ')}>{this.state.currentTime}</div>
        )
    }
}

export default Clock
