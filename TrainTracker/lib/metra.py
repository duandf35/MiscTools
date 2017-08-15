from .errors import NotifierError


class Metra:

    def __init__(self, usr, pwd, stops):
        self.__load_conf()
        self.__load_schedule()
        self.usr = usr
        self.pwd = pwd
        self.stops = stops

    def __load_conf(self):
        import yaml

        with open('metra.yml', 'r') as f:
            conf = yaml.load(f)
            self.host = conf['metra']['host']
            self.positions = conf['metra']['positions']
            self.alerts = conf['metra']['alerts']
            self.updates = conf['metra']['updates']

    def __load_schedule(self):
        import csv

        schedule = []
        with open('schedule/stop_times.csv', 'r') as f:
            for row in csv.reader(f):
                schedule.append({'trip_id': row[0], 'arrival_time': row[1], 'departure_time': row[2], 'stop': row[3]})

        # get rid of the csv header
        if schedule:
            schedule.pop(0)

        self.schedule = schedule

    def get_schedule(self):
        if not self.schedule:
            raise NotifierError('No schedule data is loaded')

        return self.schedule

    def get_alert(self):
        return self.__get(self.host, self.alerts)

    def get_update(self):
        return self.__get(self.host, self.updates)

    def __get(self, host, path):
        from http.client import HTTPSConnection
        from base64 import b64encode

        token = b64encode(f'{self.usr}:{self.pwd}'.encode('utf-8')).decode('ascii')
        headers = {'Authorization': f'Basic {token}'}

        conn = HTTPSConnection(host)
        conn.request('GET', path, headers=headers)
        resp = conn.getresponse()

        if resp.reason != 'OK':
            data = resp.reason
        else:
            data = resp.read()
        conn.close()

        return data
