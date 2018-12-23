// precompile ES6 syntax
// 改变 require 来自动编译源代码
require('@babel/register')

// Setup global variables for server-side
global.__DEV__ = process.env.NODE_ENV === 'development'


// Run server
require('./src/server')