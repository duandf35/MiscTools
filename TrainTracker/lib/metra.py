from os import environ
from .errors import MetraError
import sqlite3


class Metra:
    usr = environ['METRA_USR']
    pwd = environ['METRA_PWD']
    database = environ['METRA_DB']
    api_host = environ['METRA_API_HOST']
    api_alerts = environ['METRA_API_ALERTS']
    api_updates = environ['METRA_API_TRIP_UPDATES']
    api_positions = environ['METRA_API_POSITIONS']

    @staticmethod
    def get_alert():
        return Metra.__get(Metra.api_alerts)

    @staticmethod
    def get_update():
        return Metra.__get(Metra.api_updates)

    @staticmethod
    def get_positions():
        return Metra.__get(Metra.api_positions)

    @staticmethod
    def __get(path):
        from http.client import HTTPSConnection
        from base64 import b64encode

        token = b64encode(f'{Metra.usr}:{Metra.pwd}'.encode('utf-8')).decode('ascii')
        headers = {'Authorization': f'Basic {token}'}

        conn = HTTPSConnection(Metra.api_host)
        conn.request('GET', path, headers=headers)
        resp = conn.getresponse()
        reason = resp.reason
        data = resp.read()
        conn.close()

        if reason != 'OK':
            raise MetraError(f'Unable to get data, reason: {reason}')

        return data.decode('utf8')

    @staticmethod
    def get_stops():
        return Metra.__query(['stop_id', 'stop_name', 'stop_lat', 'stop_lon'], 'stops')

    @staticmethod
    def get_trips():
        return Metra.__query(['route_id', 'trip_id', 'trip_headsign', 'direction_id'], 'trips')

    @staticmethod
    def get_stop_times():
        return Metra.__query(['trip_id', 'arrival_time', 'departure_time', 'stop_id', 'stop_sequence'], 'stop_times')

    @staticmethod
    def get_routes():
        return Metra.__query(['route_id', 'route_short_name', 'route_long_name'], 'routes')

    @staticmethod
    def __query(columns, table):
        sql = f"SELECT {str.join(',', columns)} FROM {table}"

        conn = sqlite3.connect(Metra.database)
        cur = conn.cursor()
        cur.execute(sql)
        results = cur.fetchall()
        conn.close()

        return Metra.__to_resp(columns, results)

    @staticmethod
    def __to_resp(fields, values):
        resp = []
        entry = {}

        for value in values:
            for pair in zip(fields, value):
                entry[pair[0]] = pair[1]
            resp.append(entry)

        return resp
