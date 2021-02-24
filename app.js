const express = require('express');
const app = express();
const opts = Object.assign({
  timestamp: () => {
    return `, "time": "${new Date().toISOString()}"`;
  }
}, {
  level: process.env.LOGLEVEL || 'info'
});
const logger = require('pino')(opts);
const basicAuth = require('express-basic-auth');
const port = process.env.HTTP_PORT || 3000;

if (process.env.HTTP_USERNAME && process.env.HTTP_PASSWORD) {
  const users = {};
  users[process.env.HTTP_USERNAME] = process.env.HTTP_PASSWORD;
  app.use(basicAuth({users}));
  logger.info({users}, 'HTTP Basic Authentication is in use');
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* log call status events */
app.use('/call', (req, res) => {
  logger.info({payload: req.body}, 'received a call status event');
  res.sendStatus(200);
});

/* log dialogflow events */
app.use('/dialogflow-event', (req, res) => {
  logger.info({payload: req.body}, 'received a dialogflow event');
  res.sendStatus(200);
});

app.listen(port, () => {
  logger.info(`Example jambonz app listening at http://localhost:${port}`);
});

