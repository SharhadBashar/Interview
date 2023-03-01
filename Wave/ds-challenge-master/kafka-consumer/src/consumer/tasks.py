from . celery import app
from celery.utils.log import get_task_logger
from . kafka import KafkaConfig
from . models import Message


logger = get_task_logger('consumer')


@app.on_after_finalize.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(1.0, consume_kafka_messages.s(),
                             name='consume kafka messages')


kafka = KafkaConfig()


@app.task
def consume_kafka_messages():
    if not kafka.is_connected_to_kafka():
        kafka.connect()
    msgs = kafka.poll_for_messages()

    for msg in msgs:
        if msg is not None:
            if msg.error():
                logger.error("Consumer error: {}".format(msg.error()))
            else:
                logger.warning('Received message: {}'.format(
                        msg.value().decode('utf-8')))
                message = Message.create(msg.value().decode('utf-8'))
                message.save()
                message.refresh_from_db()
                logger.warning('Result saved: ' + message.msg)
    else:
        logger.info("No messages this time...")
