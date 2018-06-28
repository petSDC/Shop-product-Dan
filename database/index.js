const mysql = require('mysql');
const pg = require('pg');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const faker = require('faker');

//============================================
//--------------MONGODB/MONGOOSE--------------
//============================================
// const connection = mongoose.createConnection('mongodb://localhost/products', err => {
// 	if (err) {
// 		console.log('DB ERROR\n', err)
// 	} else {
// 		console.log('Connected to Mongo...')
// 	}
// });

// const productSchema = mongoose.Schema({
//   id: Number,
//   name: String,
//   price: Number,
//   shop_id: Number,
//   shop_name: String,
//   shop_city: String,
//   shop_state: String,
//   shop_image_url: String,
//   images: [String]
// });

// var Product = connection.model('Product', productSchema);

// for (var i = 0; i < 100000; i++) {
// 	var record = {
// 		id: i,
// 		name: faker.commerce.productName(),
// 		price: faker.finance.amount(),
// 		shop_id: faker.random.number({'min':1,'max':1000000}),
// 		shop_name: faker.company.catchPhrase(),
// 		shop_city: faker.address.city(),
// 		shop_state: faker.address.state(),
// 		shop_image_url: faker.image.avatar(),
// 		images: [faker.image.avatar(),faker.image.avatar(),faker.image.avatar(),faker.image.avatar(),faker.image.avatar()]
// 	}
// 	Product.create(record);
// }
//=======================================
//----------------MYSQL------------------
//=======================================
// const connection = mysql.createConnection({
//   user: 'dan',
//   password: 'ABCdef123!',
//   host: 'localhost',
//   database: 'shopProducts',
//   multipleStatements: true,
// });

const connection = new pg.Client('postgres://daniel:ABCdef123!@localhost:5432/danieldb');

module.exports = connection;

