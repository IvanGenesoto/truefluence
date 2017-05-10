const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const IG = require('./ig-main.js');
const ig = new IG();
const app = express();
const publicPath = path.join(__dirname, '/public');
const staticMiddleware = express.static(publicPath);

app.use(staticMiddleware);
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.send('HERE YOU GO!');
// })

app.post('/account', (req, res) => {
  ig.getAccount(req.body.userName)
    .then((result) => {
      console.log(result);
    })
})

const PORT = 5760;

app.listen(PORT, () => {
  console.log('listening on port: ', PORT);
})
