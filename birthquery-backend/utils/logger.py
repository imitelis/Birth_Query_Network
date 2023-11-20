import logging

logging.basicConfig(level=logging.INFO)


"""
Custom basic logger, it only has the purpose
to log some details in the terminal based
on the information we decide to record
We are going to be using this logger in the
most critical HTTP requests; POST, PATCH and
DELETE, but also in the GET Birth Query to
keep an eye if someone collects too much data
"""
logger = logging.getLogger(" Logger")

class TerminalHandler(logging.StreamHandler):
    def emit(self, record):
        msg = self.format(record)
        print(msg)

logger.addHandler(TerminalHandler())