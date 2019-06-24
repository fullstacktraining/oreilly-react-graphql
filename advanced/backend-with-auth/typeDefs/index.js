const userSchema = require('./user');
const carSchema = require('./car');

const defaultSchema = require('./default');

module.exports = [defaultSchema, userSchema, carSchema];