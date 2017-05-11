const path = require('path');
const watchify = require('watchify');
const express = require('express');
const bodyParser = require('body-parser');
const IG = require('./ig-main.js');
const ig = new IG();
const app = express();
const publicPath = path.join(__dirname, '/public');
const staticMiddleware = express.static(publicPath);

const currentSession = { initialized: false, session: {} };

app.use(staticMiddleware);
app.use(bodyParser.json());

app.post('/account', (req, res) => {
  ig.getAccountByName(req.body.userName, currentSession.session)
    .then((result) => {
      ig.getAccountById(result._params.id, currentSession.session)
        .then((idResult) => {
          res.json(idResult._params);
        })
    })
})

ig.initialize()
  .then((session) => {
    currentSession.session = session;
  })

const PORT = 5760;

app.listen(PORT, () => {
  console.log('listening on port: ', PORT);
})
