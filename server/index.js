require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
//const db = require('../database/index.js');
const redis = require('redis');
const Pool = require('pg-pool');

const config = {
    user: 'daniel',
    password: 'ABCdef123!',
    host: process.env.DB_HOST || 'localhost',
    port: '5432',
    database: 'danieldb',
    //ssl: true,
    poolSize: 50
}

const pool = new Pool(config);

pool.on('error', e => {
  console.log('Pool error:', e);
})

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || '127.0.0.1'
});

redisClient.on('connect', function() {
    console.log('connected to redis...');
});

redisClient.on('error', (err) => {
  console.log('Redis Error:\n', err)
})

const port = process.env.PORT || 5000;

// db.connect((err) => {
//   if (err) {
//     console.log('There was an ERROR', err);
//   } else {
//     console.log('Connected to postgreSQL...');
//   }
// });

const app = express();
const allowCrossDomain = function(req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  next();
}

//app.use(Pool);
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/:id/', express.static(__dirname + '/../public/'));

app.get('/:id/shopproducts/', (req, res) => {
  redisClient.exists(req.params.id, (err, reply) => {
    if (err) {
      console.log('REDIS ERROR:\n', err);
    } else if (reply === 1) {
      redisClient.get(req.params.id, (err, reply) => {
        if (err) {
          console.log('Redis Error: ', err);
        } else {
          console.log('Found in Redis:', req.params.id);
          res.send(reply);  
        }
      })
    } else {
      pool.connect().then(db => {
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
          (error, results) => {
            if (error) { 
              db.release();
              console.log('PG Query error', error); 
            } else {
              db.release();
              redisClient.set(req.params.id, JSON.stringify(results), (err, reply) => {
                if (err) {
                  console.log('Redis Error: ', err);
                } else {
                   //console.log('Saved to Redis:', req.params.id)
                }
              });              
              res.status(200).json(results)
            }
          }
        );
      }).catch(err => {
        console.log('Pool Connect Error\n', err);
      })
    }
  })
});

app.post('/:id/shopproducts/', (req, res) => {
  pool.connect().then(db => {
    db.query(`
      INSERT INTO 
      products 
      (id, name, price, id_shops) 
      VALUES 
      (${req.body.id}, '${req.body.name}', ${req.body.price}, ${req.body.id_shops})
      RETURNING *
      `, (err, results) => {
      if (err)  {
        console.log('Insert Error: ', err);
        res.status(500).send(err);
        db.release();
      } else {
        res.status(201).send(results.rows[0]);
        db.release();
      }
    })
  }).catch(err => {
    console.log('Pool connect error\n', err);
  })
});

app.put('/:id/shopproducts', (req, res) => {
  pool.connect().then(db => {
    db.query(`
      UPDATE 
      products 
      SET 
      ${req.body.field}='${req.body.update}' 
      WHERE 
      id=${req.body.id}
      RETURNING *
      `, (err, results) => {
      if (err) {
        console.log('PUT request error:\n', err);
        res.status(500).send(err);
        db.release();
      } else {
        db.release();
        res.status(202).send(results.rows[0]);
      }
    });
  }).catch(err => {
    console.log('Pool Connect Error:\n', err)
  })
});

app.delete('/:id/shopproducts', (req, res) => {
  pool.connect().then(db => {
    db.query(`DELETE FROM products WHERE id=${req.body.id} RETURNING *`, (err, results) => {
      if (err) {
        console.log('DELETE error\n', err);
        db.release();
        res.status(500).send();
      } else {
        db.release();
        console.log('DELETE RESULTS:', results.rows[0])
        res.status(204).send(results.rows[0]);
      }
    })
  }).catch(error => {
    console.log('Pool connect error\n', error);
  })
});

// app.options('/', (req, res) => {
//   res.send('OPTIONS request sent');
// })

app.listen(port, () => console.log('App listening to port 5000'));

//res.status(500).send(error)
