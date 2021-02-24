# jambonz-event-logger

An example [express](https://expressjs.com/)-based application that logs call status events and dialogflow events from a jambonz server.

## Installing

With defaults for listen port (3000) and no authentication
```
npm install
npm start
```

With options specified
```
npm install
HTTP_PORT=4000 HTTP_USERNAME=foo HTTP_PASSWORD=bar npm start
```

## Routes
Currently the app listens on:
- `/call-status` for HTTP POST requests conveying call status events
- `/dialogflow-event` for HTTP POST requests conveying dialogflow events