from .errors import MetraError
import sqlite3


class Metra:
    def __init__(self, usr, pwd, database, host, api_alerts, api_positions, api_updates):
        self.usr = usr
        self.pwd = pwd
        self.database = database
        self.host = host
        self.api_alerts = api_alerts
        self.api_positions = api_positions
        self.api_updates = api_updates

    def get_alert(self):
        return self.__get(self.api_alerts)

    def get_update(self):
        return self.__get(self.api_updates)

    def get_positions(self):
        return self.__get(self.api_positions)

    def __get(self, path):
        from http.client import HTTPSConnection
        from base64 import b64encode

        token = b64encode(f'{self.usr}:{self.pwd}'.encode('utf-8')).decode('ascii')
        headers = {'Authorization': f'Basic {token}'}

        conn = HTTPSConnection(self.host)
        conn.request('GET', path, headers=headers)
        resp = conn.getresponse()
        reason = resp.reason
        data = resp.read()
        conn.close()

        if reason != 'OK':
            raise MetraError(f'Unable to get data, reason: {reason}')

        return data.decode('utf8')

    def get_stops(self):
        return self.__query(columns=['stop_id', 'stop_name', 'stop_lat', 'stop_lon'], table='stops')

    def get_trips(self, route_id=None):
        criteria = None
        if not route_id:
            criteria = {'key': 'route_id', 'value': route_id}

        return self.__query(columns=['route_id', 'trip_id', 'trip_headsign', 'direction_id'],
                            table='trips', eq_criteria=criteria)

    def get_stop_times(self, stop_id=None):
        criteria = None
        if not stop_id:
            criteria = {'key': 'stop_id', 'value': stop_id}

        return self.__query(columns=['trip_id', 'arrival_time', 'departure_time', 'stop_id', 'stop_sequence'],
                            table='stop_times', eq_criteria=criteria)

    def get_routes(self):
        return self.__query(columns=['route_id', 'route_short_name', 'route_long_name'], table='routes')

    def __query(self, columns, table, eq_criteria=None):
        try:
            sql = f"SELECT {str.join(',', columns)} FROM {table}"

            if eq_criteria:
                sql += f" WHERE {eq_criteria['key']} = {eq_criteria['value']}"

            conn = sqlite3.connect(self.database)
            cur = conn.cursor()
            cur.execute(sql)
            results = cur.fetchall()
            conn.close()

            return self.__to_list(columns, results)
        except sqlite3.OperationalError as e:
            raise MetraError(f'Unable to connect database or table {table} does not exist')

    def __to_list(self, fields, values):
        resp = []
        entry = {}

        for value in values:
            for pair in zip(fields, value):
                entry[pair[0]] = pair[1]
            resp.append(entry)

        return resp
