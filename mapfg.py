import bottle
import socket
import re

port = 5501
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(("localhost", port))


def get(msg):
    s.send(msg)
    msg = s.recv(4096)
    msg = re.findall(r'-?[0-9]+(?:\.[0-9]*)?', msg)
    return msg


@bottle.route('/')
@bottle.route('/index.html')
def index():
    bottle.redirect('/static/index.html')


@bottle.route('/icon')
def icon():
    bottle.redirect('/static/data/plane.png')


@bottle.route('/static/<filepath:path>')
def server_static(filepath):
    return bottle.static_file(filepath, root='static/')


@bottle.route('/info', method='GET')
def info():
    lat = get('get position/latitude-deg\r\n')[0]
    lon = get('get position/longitude-deg\r\n')[0]
    head = get('get orientation/heading-deg\r\n')[0]
    return(lat + ',' + lon + ',' + head)

bottle.run(host='localhost', port=8080, reloader=True, debug=True)
#bottle.run(host='localhost', port=8080)
