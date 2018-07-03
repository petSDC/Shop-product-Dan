// const Pool = require ('pg-pool');
const db = require('../database/index.js');
const expect = require('chai').expect;
const request = require('request');

describe('Dan\'s Awesome Server', () => {

	// const config = {
	//     user: 'daniel',
	//     password: 'ABCdef123!',
	//     host: 'localhost',
	//     port: '5432',
	//     database: 'danieldb',
	//     ssl: true,
	//     poolSize: 50
	// }

	// const pool = new Pool(config);

	//pool.connect()
	 beforeEach(() => {
	 	db.connect();
	 });

	 afterEach(() => {
	 	db.end();
	 });
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
		}, () => {
			db.query(`SELECT * FROM products where id=10000001`, (err, results) => {
				if (err) {
					console.log('Query error', err);
					done();
				} else {
					console.log('Here are the rows:', results.rows);
					expect(results.rows.length).to.equal(1);
					done();
				}
			});
		});
	});
	it('Should select 50 records from database', done => {
		request({
			method: 'GET',
			uri: 'http://127.0.0.1:5000/1/shopproducts',
		}, (err, results) => {
			console.log('Here are the RESULTS:\n', results)
			if (err) {
				console.log('GET Request Error:\n', err);
			} else {
				expect(results.rows.length).to.equal(50);
				done();
			}
		})
	})
});


