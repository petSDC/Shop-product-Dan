'use strict';

const faker = require('faker');

var randomNumberGenerator = function(userContext, events, done) {
	var percentile = faker.random.number({'min':0,'max':100});
	var productId;
	if (percentile <= 80) {
		productId = faker.random.number({'min':1,'max':2000000});
	} else {
		productId = faker.random.number({'min':2000000,'max':10000000});
	}
	userContext.vars.productId = productId;
	return done();
}

module.exports = {
	randomNumberGenerator
}