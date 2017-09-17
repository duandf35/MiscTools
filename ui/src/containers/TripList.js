import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Trip from '../components/Trip'

class TripList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { displayTrips } = this.props;
        return (
            <ul>
                {displayTrips.map(trip =>
                    <Trip key={trip.id} {...trip}/>
                )}
            </ul>
        )
    }
}

TripList.propTypes = {
    displayTrips: PropTypes.arrayOf(
        PropTypes.shape({
            tripId: PropTypes.string.isRequired,
            stopId: PropTypes.string.isRequired,
            arrival: PropTypes.string.isRequired,
            departure: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
};

function displayTrips(trips, watchStops) {
    let displayTrips = [];
    watchStops.forEach(stopId => {
        if (displayTrips.length > 0) {
            let tripIds = trips[stopId].map(trip => {
                return trip.tripId;
            });

            displayTrips = displayTrips.filter(trip => {
               return tripIds.includes(trip.tripId);
            })
        } else if (trips[stopId]) {
            displayTrips = trips[stopId];
        }
    });

    return displayTrips;
}

const mapStateToProps = ({ trips, watchStops }) => {
    return {
        displayTrips: displayTrips(trips, watchStops)
    }
};

export default connect(mapStateToProps)(TripList)
