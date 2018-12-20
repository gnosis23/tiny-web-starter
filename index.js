// precompile ES6 syntax
require('@babel/register')

// Setup global variables for server-side
global.__DEV__ = process.env.NODE_ENV === 'development'


// Run server
require('./src/server')