from .lib.metra import Metra, MetraError
from flask import Flask, jsonify, request
from configparser import ConfigParser
from datetime import datetime, timedelta
from pytz import timezone
from os import environ
import json

app = Flask(__name__)
config = ConfigParser(environ)
config.read('config.ini')

metra = Metra(usr=config['METRA']['USR'],
              pwd=config['METRA']['PWD'],
              database=config['METRA']['DB'],
              host=config['METRA']['HOST'],
              alerts=config['METRA']['ALERTS'],
              positions=config['METRA']['POSITIONS'],
              updates=config['METRA']['TRIP_UPDATES'])

METRA_TZ = timezone(environ['METRA_TZ'])

METRA_WINDOW = int(environ['METRA_WINDOW'])


@app.route('/api/ok')
def ok():
    return 'ok'


@app.route('/api/stops/<string:route_id>')
def get_stops(route_id):
    try:
        return jsonify(metra.get_stops(route_id))
    except MetraError as e:
        return e.message


@app.route('/api/stop_times/<string:stop_id>')
def get_stop_times(stop_id):
    """
    Get scheduled times for a given stop.
    The window size is 2 hours by default.

    Assumption:
    1. the passed arrival and departure time is timestamp.
    2. the time zone of the passed arrival and departure is UTC.
    :param stop_id:
    :return:
    """
    try:
        arrival = request.args.get('arrival')
        departure = request.args.get('departure')

        arrival = datetime.fromtimestamp(arrival).astimezone(METRA_TZ) if arrival else datetime.now(METRA_TZ)
        departure = datetime.fromtimestamp(departure).astimezone(METRA_TZ) if departure else None

        if not departure or departure < arrival:
            departure = arrival + timedelta(hours=METRA_WINDOW)

        arrival = arrival.time()
        departure = departure.time()

        # if the departure is next day, the time is represented as '25:00:00' instead of '01:00:00' in the database
        if arrival.hour > departure.hour:
            departure = None

        return jsonify(metra.get_stop_times(stop_id, arrival, departure))
    except MetraError as e:
        return e.message


@app.route('/api/trips/<string:route_id>')
def get_trips(route_id):
    try:
        return jsonify(metra.get_trips(route_id))
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
