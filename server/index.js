const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const port = process.env.PORT || 5000;

db.connect((err) => {
  if (err) {
    console.log('There was an ERROR', err);
  } else {
    console.log('NO DB ERRORS');
  }
});

const app = express();
const allowCrossDomain = function(req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  next();
}

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/:id/', express.static(__dirname + '/../public/'));

app.get('/:id/shopproducts/', (req, res) => {
  console.log('DB==========')
  db.query(
    `SELECT name, city, state, shop_image_url
     FROM shops 
     WHERE id = 
        (SELECT id_shops FROM products WHERE id = ${req.params.id});
        
    SELECT products.id, products.name, products.price, images.image_url 
    FROM products 
    INNER JOIN images  
    ON products.id = images.id_products 
      AND products.id_shops = (SELECT id_shops from products where id = ${req.params.id}) 
    ORDER BY products.id;`,

    (error, results) => (error ? console.log('======Query error', error) : res.status(200).json(results)),
  );
});

app.post('/', (req, res) => {
  res.send('POST request sent');
});

app.put('/', (req, res) => {
  res.send('PUT request sent');
});

app.delete('/', (req, res) => {
  res.send('DELETE request sent');
});

app.options('/', (req, res) => {
  res.send('OPTIONS request sent');
})

app.listen(port, () => console.log('App listening to port 5000'));

//res.status(500).send(error)
