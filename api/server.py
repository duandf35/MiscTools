from .lib.metra import Metra, MetraError
from flask import Flask, jsonify
from flask_socketio import SocketIO, send
from configparser import ConfigParser
from datetime import datetime, timedelta
from pytz import timezone
from os import environ
import json

config = ConfigParser(environ)
config.read('config.ini')

app = Flask(__name__)
app.config['SECRET_KEY'] = config['SOCKET']['SECRET']

# the default namespace of websocket is 'socket.io'
socketio = SocketIO(app)

metra = Metra(usr=config['METRA']['USR'],
              pwd=config['METRA']['PWD'],
              database=config['METRA']['DB'],
              host=config['METRA']['HOST'],
              alerts=config['METRA']['ALERTS'],
              positions=config['METRA']['POSITIONS'],
              updates=config['METRA']['TRIP_UPDATES'])

METRA_TZ = timezone(config['METRA']['TIME_ZONE'])

METRA_WINDOW = int(config['METRA']['TIME_WINDOW'])


@app.route('/api/ok')
def ok():
    return 'ok'


@app.route('/api/stops/<string:route_id>')
def get_stops(route_id):
    try:
        return jsonify(metra.get_stops(route_id))
    except MetraError as e:
        return e.message


@app.route('/api/stop_times/<string:route_id>/<string:stop_id>')
def get_stop_times(route_id, stop_id):
    """
    Get scheduled times for a given stop within a time window.

    :param route_id:
    :param stop_id:
    :return:
    """
    try:
        now = datetime.now(METRA_TZ)
        arrival = now
        departure = arrival + timedelta(hours=METRA_WINDOW)

        arrival = arrival.time()
        departure = departure.time()

        # if the train departs next day, the time is represented as '25:00:00' in the database
        if arrival.hour > departure.hour:
            departure = None

        stop_times = metra.get_stop_times(route_id, stop_id, now.weekday(), arrival, departure)

        trimmed_trip_ids = {}
        trimmed_stop_times = []
        for stop_time in stop_times:
            # trim the trip_id: BNSF_BN1212_V1_A => BNSF_BN1212
            trimmed = '_'.join(stop_time['trip_id'].split('_')[:2])

            if trimmed not in trimmed_trip_ids.keys():
                trimmed_trip_ids[trimmed] = True
                stop_time['trip_id'] = trimmed
                trimmed_stop_times.append(stop_time)

        return jsonify(trimmed_stop_times)
    except MetraError as e:
        return e.message


@app.route('/api/routes')
def get_routes():
    try:
        return jsonify(metra.get_routes())
    except MetraError as e:
        return e.message


@app.route('/api/alerts')
def get_alerts():
    try:
        alerts = metra.get_alert()
        return jsonify(json.loads(alerts))
    except MetraError as e:
        return e.message


@app.route('/api/updates')
def get_updates():
    try:
        updates = metra.get_update()
        return jsonify(json.loads(updates))
    except MetraError as e:
        return e.message


@app.route('/api/positions')
def get_positions():
    try:
        positions = metra.get_positions()
        return jsonify(json.loads(positions))
    except MetraError as e:
        return e.message


# ----------------------------------------------

@socketio.on('stops')
def get_stops_socket(route_id):
    resp = json.dumps(metra.get_stops(route_id))
    send(resp, json=True)
