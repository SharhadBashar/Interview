FROM python:3

WORKDIR /app

RUN pip install uwsgi

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY src /app/src

RUN useradd uwsgi && chown -R uwsgi /app/src

WORKDIR /app/src

USER uwsgi

CMD [ "bash", "bin/run.sh" ]