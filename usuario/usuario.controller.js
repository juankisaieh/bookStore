const argon2 = require('argon2')
const { createUserMongo } = require("./usuario.actions")
const { throwCustomError } = require("../utils/functions")

async function createUser(datos) {
  const { username, password } = datos

  if (password.length < 6) {
      throwCustomError(400, "Password length has to be greater than 6")
  }

  try {
    const hash = await argon2.hash(password);
    datos = { ...datos, password: hash }
  } catch (err) {
    throwCustomError(500, "Unable to hash password!")
  }

  const createdUser = await createUserMongo(datos)
  return createdUser
}

module.exports = {
  createUser
}