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

        return jsonify(metra.get_stop_times(route_id, stop_id, now.weekday(), arrival, departure))
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
