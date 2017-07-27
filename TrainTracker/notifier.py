from service.errors import NotifierError
from service.tracker import TrainTracker
from os.path import dirname, abspath
import sys
import csv


class Notifier:

    def __init__(self):
        self.__api_key = None

    def parse(self):
        sys.argv.pop(0)

        while sys.argv:
            arg = sys.argv.pop(0)

            if arg == '--key':
                if not sys.argv:
                    raise NotifierError('No value is passed for attribute {}'.format(arg))
                self.__api_key = sys.argv.pop(0)
            else:
                raise NotifierError('Unknown attribute: {}'.format(arg))

    def start(self, target_routes=()):
        for route in target_routes:
            tracker = TrainTracker(self.__api_key)
            results = tracker.directions(route[0], route[1])

            print([result['summary'] for result in results])


if __name__ == '__main__':
    n = Notifier()

    try:
        routes = []
        with open(f'{dirname(abspath(__file__))}/route.csv', 'r') as f:
            for row in csv.reader(f):
                routes.append(row)

            # get rid of the header
            if routes:
                routes.pop(0)
        f.close()

        n.parse()
        n.start(routes)
    except NotifierError as e:
        print('Unable to start notifier. {}'.format(e.message))
