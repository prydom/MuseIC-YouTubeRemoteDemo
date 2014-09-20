import gevent
from gevent.wsgi import WSGIServer
from gevent.queue import Queue

from flask import Flask, Response

import time

class ServerSentEvent(object):

    def __init__(self, data, event):
        self.data = data
        self.event = event or None
        self.id = None
        self.desc_map = {
            self.data : "data",
            self.event : "event",
            self.id : "id"
        }

    def encode(self):
        if not self.data:
            return ""
        lines = ["%s: %s" % (v, k)
                 for k, v in self.desc_map.iteritems() if k]

        return "%s\n\n" % "\n".join(lines)

app = Flask(__name__)
app._static_folder = './'
subs = []

@app.route('/')
def root():
    return app.send_static_file('index.html')

import os
@app.route('/<path:path>')
def static_proxy(path):
    return app.send_static_file(path)

@app.route("/next_video")
def push_nextVideo():
    def notify():
        msg = "NEXT!"
        for sub in subs:
            sub.put([msg, 'next_video'])

    gevent.spawn(notify)

    return "OK"

@app.route("/pause_play")
def push_pausePlay():
    def notify():
        msg = "PAUSE/PLAY"
        for sub in subs:
            sub.put([msg, 'pause_play'])

    gevent.spawn(notify)

    return "OK"

@app.route("/subscribe")
def subscribe():
    def gen():
        q = Queue()
        subs.append(q)
        try:
            while True:
                result, event = q.get()
                ev = ServerSentEvent(str(result), str(event))
                yield ev.encode()
        except GeneratorExit:
            subs.remove(q)

    return Response(gen(), mimetype="text/event-stream")

if __name__ == "__main__":
    app.debug = True
    server = WSGIServer(("", 5000), app)
    server.serve_forever()
