const fs = require('fs')
const path = require('path')

// Regexps from dotenv docs

const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
const NEWLINES_MATCH = /\n|\r|\r\n/

// Parses string from .env into an Object for further processes

function parse(src) {
  const obj = {}


  src.toString().split(NEWLINES_MATCH).forEach(function(line) {
    const key_value = line.match(RE_INI_KEY_VAL)
    if (key_value != null) {
      const key = key_value[1]
      obj[key] = (key_value[2])
    }
  })
  return obj
}

function config() {
  let dotenvPath = path.resolve(process.cwd(), '.env')
  try {
    const parsedStr = parse(fs.readFileSync(dotenvPath))
    Object.keys(parsedStr).forEach(function(key) {
      process.env[key] = parsedStr[key]

    })

    return {
      parsedStr
    }
  } catch (e) {
    return {
      error: e
    }
  }
}

module.exports.config = config