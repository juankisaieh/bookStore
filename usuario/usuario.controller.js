const argon2 = require('argon2')
var jwt = require('jsonwebtoken');

const { createUserMongo, getUserMongo, updateUserMongo, deleteUserMongo } = require("./usuario.actions")
const { throwCustomError, respondWithError } = require("../utils/functions")

async function createUser(data) {
  const { username, password } = data

  if (password.length < 6) {
    throwCustomError(400, "Password longer than 7")
  }
  const hash = await argon2.hash(password);
  data = { ...data, password: hash }
  const createdUser = await createUserMongo(data)
  return createdUser
}

async function loginController(data) {
  const { password } = data
  const user = await getUserMongo(data)
  console.log(user);
  if (await argon2.verify(user.password, password)) {
    // generate jwt
    return await jwt.sign({user: user}, process.env.JWT_SECRET)
    
  } else {
    throwCustomError(401, "Anauthorized")
  }
}

async function readUser(req) {
  const token = req.header('Authorization')
  const signedUser = jwt.verify(token, process.env.JWT_SECRET)

  if (signedUser) {
    return getUserMongo(req.body)
  } else {
    throwCustomError(401, "Anauthorized")
  }
}

async function updateUser(req) {
  const token = req.header('Authorization')
  const signedUser = jwt.verify(token, process.env.JWT_SECRET).user
  
  if (signedUser) {
    console.log(signedUser._id, req.body)
    const updatedUser = updateUserMongo(signedUser._id, req.body)
    return updatedUser
  } else {
    throwCustomError(401, "Anauthorized")
  }
}

async function softDeleteUser(req) {
  const token = req.header('Authorization')
  const signedUser = jwt.verify(token, process.env.JWT_SECRET).user
  if (signedUser) {
    return deleteUserMongo(signedUser)
  } else {
    throwCustomError(401, "Anauthorized")
  }
}

module.exports = {
  createUser,
  loginController,
  readUser,
  updateUser,
  softDeleteUser
}