require('dotenv').config();

const path = require('path');
const express = require('express'); // npm installed
const axios = require('axios');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/client/dist')));

// other configuration...
app.use((req, res, next) => {
  req.headers.Authorization = process.env.AUTH;
  next();
});
axios.defaults.headers.common['Authorization'] = process.env.AUTH;
//routes

// app.post('/upload', (req, res) => {
//   axios
//     .post(`https://api.imgbb.com/1/upload/?key=${process.env.IMG_API}&image=${req.body.image}`)
//     .then((result) => {
//       console.log('THIS IS THE RESULT ON THE SERVER SIDE');
//       res.status(200).send(result.data)
//     })
//     .catch((err) => console.log('ERROR ON SERVER SIDE', err))
// })

app.get('/products/:productId', (req, res) => {
  axios
    .get(`http://127.0.0.1:3001/products/${req.params.productId}`)
    .then((result) => res.status(200).send(result.data))
    .catch(() => res.sendStatus(404));
});

app.get('/products', (req, res) => {
  let qString = 'http://127.0.0.1:3001/products';
  if ('count' in req.query && 'page' in req.query) {
    qString = `http://127.0.0.1:3001/products?count=${req.query.count}&page=${req.query.page}`;
  } else if ('count' in req.query) {
    qString = `http://127.0.0.1:3001/products?count=${req.query.count}`;
  } else if ('page' in req.query) {
    qString = `http://127.0.0.1:3001/products?page=${req.query.page}`;
  }
  axios
    .get(qString)
    .then((result) => res.status(200).send(result.data))
    .catch(() => res.sendStatus(404));
});

app.get('/products/:productId/styles', (req, res) => {
  console.log('glhf');
  axios
    .get(`http://127.0.0.1:3001/products/${req.params.productId}/styles`)
    .then((result) => res.status(200).send(result.data))
    .catch(() => res.sendStatus(404));
});

app.get('/products/:productId/related', (req, res) => {
  console.log('glhf');
  axios
    .get(`http://127.0.0.1:3001/products/${req.params.productId}/related`)
    .then((result) => res.status(200).send(result.data))
    .catch(() => res.sendStatus(404));
});

app.get('/*', (req, res) => {
  axios
    .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${req.url}`, {
      headers: {
        Authorization: process.env.AUTH,
      },
    })

    .then((result) => res.status(200).send(result.data))
    .catch((err) => res.sendStatus(404));
});

app.post('/*', (req, res) => {
  axios
    .post(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${req.url}`,
      req.body,
      {
        headers: {
          Authorization: process.env.AUTH,
        },
      }
    )

    .then((result) => res.sendStatus(200))
    .catch((err) => res.sendStatus(404));
});

app.put('/*', (req, res) => {
  axios
    .put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${req.url}`, {
      headers: {
        Authorization: process.env.AUTH,
      },
    })
    .then((result) => res.status(200).send(result.data))
    .catch((err) => res.sendStatus(404));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log(`Server listening at http://localhost:${PORT}`);

// {
//   "product_id": 40344,
//   "rating": 4,
//   "summary": "Thought this product did it's job",
//   "body": "Overall, love it. Would recommend to most people. Think that it could use more style options",
//   "recommend": true,
//   "name": "Isaac",
//   "email": "blahblah@gmail.com",
//   "photos": [],
//   "characteristics": {}
// }
