from lib.errors import NotifierError
from lib.notifier import Notifier


def __parse_targets_csv(notifier, file):
    import csv

    target_stops = []
    with open(file, 'r') as f:
        for row in csv.reader(f):
            target_stops.append({'from': row[0], 'to': row[1], 'train': row[2]})

        # get rid of the csv header
        if target_stops:
            target_stops.pop(0)

    notifier.stops = target_stops


def __parse_auth_stdin(notifier):
    from sys import argv

    argv.pop(0)
    while argv:
        arg = argv.pop(0)

        if arg == '-u' or arg == '--usr':
            notifier.usr = argv.pop(0)
        elif arg == '-p' or arg == '--pwd':
            notifier.pwd = argv.pop(0)

if __name__ == '__main__':
    from os.path import dirname, abspath

    try:
        n = Notifier()

        __parse_auth_stdin(n)
        __parse_targets_csv(n, f'{dirname(abspath(__file__))}/stops.csv')

        n.start()
    except NotifierError as e:
        print(f'Unable to start notifier: {e.message}')
    except IndexError as e:
        print(f'Unable to start notifier: {e}')
