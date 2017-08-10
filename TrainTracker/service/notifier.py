from .errors import NotifierError
from .metra import Tracker
from .scheduler import *
from .messenger import *


class Notifier:

    def __init__(self, stops=None, usr=None, pwd=None):
        self.stops = stops
        self.usr = usr
        self.pwd = pwd

    def start(self):
        for k, v in {'routes': self.stops, 'usr': self.usr, 'pwd': self.pwd}.items():
            if not v:
                raise NotifierError(f'Missing property {k}')

        metra = Tracker(self.usr, self.pwd, self.stops)

        schedule = metra.get_schedule()
        alert = metra.get_alert()
        update = metra.get_update()
