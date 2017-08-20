from .lib.metra import Metra
from .lib.errors import MetraError
from flask import Flask, jsonify
import json

app = Flask(__name__)

metra = Metra()


@app.route('/api/ok')
def ok():
    return 'ok'


@app.route('/api/stops')
def get_stops():
    return jsonify(metra.get_stops())


@app.route('/api/stop_times')
def get_stop_times():
    return jsonify(metra.get_stop_times())


@app.route('/api/trips')
def get_trips():
    return jsonify(metra.get_trips())


@app.route('/api/routes')
def get_routes():
    return jsonify(metra.get_routes())


@app.route('/api/alerts/<trip>')
def get_alerts(trip):
    try:
        alerts = metra.get_alert()
    except MetraError as e:
        return e.message

    return jsonify(json.loads(alerts))


@app.route('/api/updates/<trip>')
def get_updates(trip):
    try:
        updates = metra.get_update()
    except MetraError as e:
        return e.message

    return jsonify(json.loads(updates))


@app.route('/api/positions/<trip>')
def get_positions(trip):
    try:
        positions = metra.get_positions()
    except MetraError as e:
        return e.message

    return jsonify(json.loads(positions))
