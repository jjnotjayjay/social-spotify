const querystring = require('querystring')

function hashParser(hash) {
  let [ location, params ] = hash.split('?')
  location = location.substring(1)
  params = querystring.parse(params)
  return [ location, params ]
}

module.exports = hashParser
