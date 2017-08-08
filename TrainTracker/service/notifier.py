from .errors import NotifierError
from .metra import Tracker
from .scheduler import *
from .messenger import *


class Notifier:

    def __init__(self, routes=None, usr=None, pwd=None):
        self.routes = routes
        self.usr = usr
        self.pwd = pwd

    def start(self):
        for k, v in {'routes': self.routes, 'usr': self.usr, 'pwd': self.pwd}.items():
            if not v:
                raise NotifierError(f'Missing property {k}')

        resp = Tracker(self.usr, self.pwd).start(self.routes)
        print(resp)
