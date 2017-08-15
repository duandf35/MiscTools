from .errors import NotifierError
from .metra import Metra
from .scheduler import *
from .messenger import *


class Notifier:

    def __init__(self, stops=None, usr=None, pwd=None):
        self.stops = stops
        self.usr = usr
        self.pwd = pwd

    def start(self):
        for k, v in {'stops': self.stops, 'usr': self.usr, 'pwd': self.pwd}.items():
            if not v:
                raise NotifierError(f'Missing property {k}')

        metra = Metra(self.usr, self.pwd, self.stops)

        # print(metra.get_schedule())
        print(metra.get_alert())
        print(metra.get_update())
