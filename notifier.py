from service.errors import NotifierError
import sys
import time


class Notifier:
    __api_key = None
    __start = True
    __interval = 1

    def parse(self):
        sys.argv.pop(0)

        while sys.argv:
            arg = sys.argv.pop(0)

            if arg == '--key':
                if not sys.argv:
                    raise NotifierError('No value is passed for attribute {}'.format(arg))
                self.__api_key = sys.argv.pop(0)
            elif arg == '--interval':
                if not sys.argv:
                    raise NotifierError('No value is passed for attribute {}'.format(arg))
                self.__interval = sys.argv.pop(0)
            else:
                raise NotifierError('Unknown attribute: {}'.format(arg))

    def start(self):
        if self.__interval < 1:
            raise NotifierError('Interval can not be less than 1s')

        while self.__start:
            time.sleep(self.__interval)

            # TODO: implementation

    def stop(self):
        self.__start = False

if __name__ == '__main__':
    n = Notifier()

    try:
        n.parse()
        n.start()
    except NotifierError as e:
        print('Unable to start notifier. {}'.format(e.message))
