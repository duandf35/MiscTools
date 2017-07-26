from datetime import datetime, timedelta
import googlemaps


class TrainTracker:

    def __init__(self, key):
        self.__client = googlemaps.Client(key=key)

    def directions(self, orig, dest):
        departure_time = datetime.now() + timedelta(minutes=45)
        results = self.__client.directions(orig, dest, mode='transit', transit_mode='train',
                                           departure_time=departure_time)

        direction_results = []
        for details in [result['legs'] for result in results]:
            for detail in details:
                duration = detail['duration']['text']
                transits = []
                for transit in [step['transit_details'] for step in detail['steps']
                                if step['travel_mode'] != 'WALKING']:
                    transits.append({
                        'arrival': {'stop': transit['arrival_stop']['name'], 'time': transit['arrival_time']},
                        'departure': {'stop': transit['departure_stop']['name'], 'time': transit['departure_time']}
                    })

                # TODO: include total walking distance and duration

                summary = {'from': orig, 'to': dest, 'duration': duration, 'main_transits': transits}
                direction_results.append({'summary': summary, 'detail': detail})

        return direction_results
