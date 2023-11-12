import logging

logging.basicConfig(level=logging.INFO)

"""
Custom basic logger, it only has the purpose
to log some details in the terminal based
on the information we decide to record
"""
logger = logging.getLogger("custom_logger")

class TerminalHandler(logging.StreamHandler):
    def emit(self, record):
        msg = self.format(record)
        print(msg)

logger.addHandler(TerminalHandler())