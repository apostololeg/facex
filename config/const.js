const pkg = require('../package.json');
const { parsed: env } = require('dotenv').config();

env.PRODUCTION = process.env.NODE_ENV === 'production';
env.VERSION = pkg.version;

module.exports = env;
