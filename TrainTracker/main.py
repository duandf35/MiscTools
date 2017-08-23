from .lib.metra import Metra, MetraError
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
              alerts=config['METRA_API']['ALERTS'],
              positions=config['METRA_API']['POSITIONS'],
              updates=config['METRA_API']['TRIP_UPDATES'])


@app.route('/api/ok')
def ok():
    return 'ok'


@app.route('/api/stops')
def get_stops():
    try:
        return jsonify(metra.get_stops())
    except MetraError as e:
        return e.message


@app.route('/api/stop_times/<string:stop_id>')
def get_stop_times(stop_id):
    try:
        return jsonify(metra.get_stop_times(stop_id))
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
