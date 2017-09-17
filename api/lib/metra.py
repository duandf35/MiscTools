import sqlite3


class Metra:
    def __init__(self, usr, pwd, database, **api):
        self.usr = usr
        self.pwd = pwd
        self.database = database
        self.host = api['host']
        self.api_alerts = api['alerts']
        self.api_positions = api['positions']
        self.api_updates = api['updates']
        self.weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

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

    def get_stops(self, route_id):
        return self.__execute(sql=f"SELECT DISTINCT t.route_id, st.stop_id, s.stop_name, s.stop_lat, s.stop_lon \
                                    FROM stop_times st \
                                    JOIN trips t ON t.trip_id = st.trip_id \
                                    JOIN stops s ON st.stop_id = s.stop_id \
                                    WHERE t.route_id = '{route_id}'",
                              columns=['route_id', 'stop_id', 'stop_name', 'stop_lat', 'stop_lon'])

    def get_trips(self, route_id):
        criteria = f"WHERE route_id = '{route_id}'"

        return self.__query(columns=['route_id', 'trip_id', 'trip_headsign', 'direction_id'],
                            table='trips', criteria=criteria)

    def get_stop_times(self, route_id, stop_id, weekday, arrival, departure):
        sql = f"SELECT DISTINCT t.route_id, st.trip_id, st.arrival_time, st.departure_time, \
                st.stop_id, st.stop_sequence, t.trip_headsign \
                FROM stop_times st \
                JOIN trips t ON t.trip_id = st.trip_id \
                JOIN calendar c ON c.service_id = t.service_id \
                WHERE st.stop_id = '{stop_id}' AND t.route_id = '{route_id}' \
                AND arrival_time >= '{arrival}' \
                AND departure_time <= '{departure}' \
                AND {self.weekdays[weekday]} == 1"

        return self.__execute(sql=sql,
                              columns=['route_id', 'trip_id', 'arrival_time', 'departure_time',
                                       'stop_id', 'stop_sequence', 'trip_headsign'])

    def get_routes(self):
        return self.__query(columns=['route_id', 'route_short_name', 'route_long_name'], table='routes')

    def __query(self, columns, table, criteria=None):
        sql = f"SELECT {str.join(',', columns)} FROM {table} "

        if criteria:
            sql += criteria

        return self.__execute(sql, columns)

    def __execute(self, sql, columns):
        try:
            conn = sqlite3.connect(self.database)
            cur = conn.cursor()
            cur.execute(sql)
            results = cur.fetchall()
            conn.close()

            entry_list = []
            for value in results:
                entry_list.append({k: v for k, v in zip(columns, value)})

            return entry_list

        except sqlite3.OperationalError as e:
            raise MetraError(f'Unable to process the query, error: {e}.')


class MetraError(Exception):
    def __init__(self, message):
        super().__init__(self, message)
        self.message = message
