
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./chatgpt-helper.cjs.production.min.js')
} else {
  module.exports = require('./chatgpt-helper.cjs.development.js')
}
