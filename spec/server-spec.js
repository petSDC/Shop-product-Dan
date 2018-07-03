// const Pool = require ('pg-pool');
// const db = require('../database/index.js');
const expect = require('chai').expect;
const request = require('request');
const Pool = require('pg-pool');

const config = {
    user: 'daniel',
    password: 'ABCdef123!',
    host: 'localhost',
    port: '5432',
    database: 'danieldb',
    ssl: true,
    poolSize: 50
}

const pool = new Pool(config);

pool.on('error', e => {
  console.log('Pool error:', e);
})


//db.connect();

// db.on('error', err => {
// 	console.log('DB Connection Error\n', err);
// })

describe('Dan\'s Awesome Server', () => {

	 // beforeEach(() => {
	 // 	pool.connect();
	 // });

	 // afterEach(() => {
	 // 	pool.release();
	 // });
	it('Should insert posted products into database', done => {
		request({
		    method: 'POST',
		    uri: 'http://127.0.0.1:5000/1/shopproducts',
		    json: {
		  	  id: 10000001,
		  	  name: 'Cool Product',
		  	  price: 13.37,
		  	  id_shops: 1
		    }
		}, (err, results) => {
			if (err) {
				console.log('POST Error:\n', err)
			}
			expect(results.body.name).to.equal('Cool Product');
			done();
		});
	});
	it('Should select 50 records from database', done => {
		request({
			method: 'GET',
			uri: 'http://127.0.0.1:5000/2/shopproducts',
		}, (err, results) => {
			if (err) {
				console.log('GET Request Error:\n', err);
			} else {
				expect(JSON.parse(results.body).rows.length).to.equal(51);
				done();
			}
		})
	});
	it('Should update records from database', done => {
		request({
			method: 'PUT',
			uri: 'http://127.0.0.1:5000/2/shopproducts',
			json: {
				id: 10000001,
				field: 'name',
				update: 'Crunchy Product'
			}
		}, (err, results) => {
			if (err) {
				console.log('PUT request error:\n', err);
			} else {
				expect(results.body.name).to.equal('Crunchy Product');
				done();
			}
		})
	});
	it('Should delete records from the database', done => {
		request({
			method: 'DELETE',
			uri: 'http://127.0.0.1:5000/2/shopproducts',
			json: {
				id: 10000001
			}
		}, (err, results) => {
			if (err) {
				console.log('DELETE request error\n', err);
			} else {
				pool.query(`SELECT * FROM products WHERE id=10000001`, (error, results) => {
					if (error) {
						console.log('SELECT error\n', error);
						done();
					} else {
						expect(results.rows.length).to.equal(0);
						done();
					}
				})
			}
		})
	})
});


