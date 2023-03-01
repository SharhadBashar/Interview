
from confluent_kafka import Producer


class Kafka:
    p = None

    def sendMessage(self, message):
        if self.p is None:
            self.p = Producer({'bootstrap.servers': 'broker:29092'})

        print('Sending message {}'.format(message))
        self.p.produce('messages', message.encode('utf-8'),
                       callback=self.delivery_report)
        self.p.flush()

    def delivery_report(self, err, msg):
        """ Called once for each message produced to indicate delivery result.
        Triggered by poll() or flush(). """
        if err is not None:
            print('Message delivery failed: {}'.format(err))
            raise Exception()
        else:
            print('Message delivered to {} [{}]'.format(msg.topic(),
                                                        msg.partition()))
