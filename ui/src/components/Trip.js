import React from 'react'
import { PropTypes } from 'prop-types'
import spectre from 'spectre.css/dist/spectre.css'

const Trip = ({ tripId, stopId, arrival, departure }) => (
    <li className={[spectre['toast'], spectre['toast-success']].join(' ')}>
        <div>
            <p>
                {tripId}
                <br/>
                {stopId}
                <br/>
                {displayTime(arrival, departure)}
            </p>
        </div>
    </li>
);

function displayTime(arrival, departure) {
    if (arrival === departure) {
        return arrival
    } else {
        return "A: " + arrival + " , D: " + departure;
    }
}

Trip.propTypes = {
    tripId: PropTypes.string.isRequired,
    stopId: PropTypes.string.isRequired,
    arrival: PropTypes.string.isRequired,
    departure: PropTypes.string.isRequired
};

export default Trip
