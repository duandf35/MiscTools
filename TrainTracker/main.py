from service.errors import NotifierError
from service.notifier import Notifier


def __parse_targets_csv(notifier, file):
    import csv

    defined_routes = []
    with open(file, 'r') as f:
        for row in csv.reader(f):
            defined_routes.append(row)

        # get rid of the header
        if defined_routes:
            defined_routes.pop(0)

    notifier.routes = defined_routes[0]


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
        __parse_targets_csv(n, f'{dirname(abspath(__file__))}/route.csv')

        n.start()
    except NotifierError as e:
        print(f'Unable to start notifier: {e.message}')
    except IndexError as e:
        print(f'Unable to start notifier: {e}')
