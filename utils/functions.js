var jwt = require('jsonwebtoken')

function throwCustomError(code, msg) {
  throw new Error(JSON.stringify({code, msg}))
}

function respondWithError(res, e) {
  console.log(e)
  const err = JSON.parse(e.message)
  res.status(err.code).json({
      mensaje: "Fallido. ✌",
      err: err.msg,
  })
}

async function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
  return decoded
 }

module.exports = { 
  throwCustomError,
  respondWithError,
  verifyToken
}