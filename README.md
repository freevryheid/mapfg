mapfg
=====

Map flightgear using python, dojo javascript framework and openlayers.

Instructions
============

1. Clone the repo: git clone git://github.com/freevryheid/mapfg.git
2. Start flightgear with the --props=5501 parameter.
   If you use another port for props, change the mapfg.py file as well.
   Also check/change the webserver port in mapfg.py - currently set to 8080.
3. When flightgear is up and running, run python mapfg.py
   This starts a local web server - point your browser to http://localhost:8080