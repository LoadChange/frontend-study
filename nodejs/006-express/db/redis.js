const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

const { host, port } = REDIS_CONF;

const connection = redis.createClient(port, host);

module.exports = connection;
