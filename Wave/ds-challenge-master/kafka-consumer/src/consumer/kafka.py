from confluent_kafka import Consumer
import logging


class KafkaConfig:
    c = None

    mylogger = logging.getLogger()
    mylogger.addHandler(logging.StreamHandler())

    def __init__(self):
        self.is_connected = False
        self.config = {
            'bootstrap.servers': 'broker:29092',
            'group.id': 'mygroup',
            'auto.offset.reset': 'earliest',
            'session.timeout.ms': 6000,
            'error_cb': self.on_error,
            'stats_cb': self.stats_cb,
            'logger': self.mylogger

        }

    def connect(self):
        self.c = Consumer(self.config)
        self.c.subscribe(['messages'])
        self.is_connected = True

    def is_connected_to_kafka(self):
        return self.is_connected

    def poll_for_messages(self):
        results = []
        msg = self.c.poll(.5)
        if msg is not None:
            results.append(msg)
        return results

    def on_error(self, error_str):
        print("Kafka error: " + error_str)

    def stats_cb(self, str):
        print("Kafka stats: " + str)
