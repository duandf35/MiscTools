from .lib.metra import Metra
from .lib.errors import MetraError
from flask import Flask, jsonify
from configparser import ConfigParser
from os import environ
import json

app = Flask(__name__)
config = ConfigParser(environ)
config.read('config.ini')

metra = Metra(usr=config['METRA']['USR'],
              pwd=config['METRA']['PWD'],
              database=config['METRA']['DB'],
              host=config['METRA_API']['HOST'],
              api_alerts=config['METRA_API']['ALERTS'],
              api_positions=config['METRA_API']['POSITIONS'],
              api_updates=config['METRA_API']['TRIP_UPDATES'])


@app.route('/api/ok')
def ok():
    return 'ok'


@app.route('/api/stops')
def get_stops():
    return jsonify(metra.get_stops())


@app.route('/api/stop_times/<string:stop_id>')
def get_stop_times(stop_id):
    return jsonify(metra.get_stop_times(stop_id))


@app.route('/api/trips/<string:route_id>')
def get_trips(route_id):
    return jsonify(metra.get_trips(route_id))


@app.route('/api/routes')
def get_routes():
    return jsonify(metra.get_routes())


@app.route('/api/alerts')
def get_alerts():
    try:
        alerts = metra.get_alert()
    except MetraError as e:
        return e.message

    return jsonify(json.loads(alerts))


@app.route('/api/updates')
def get_updates():
    try:
        updates = metra.get_update()
    except MetraError as e:
        return e.message

    return jsonify(json.loads(updates))


@app.route('/api/positions')
def get_positions():
    try:
        positions = metra.get_positions()
    except MetraError as e:
        return e.message

    return jsonify(json.loads(positions))
