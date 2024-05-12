const Usuario = require("./usuario.model")

async function createUserMongo(data) {
  const createdUser = await Usuario.create(data)

  return createdUser;
}

async function getUserMongo(data) {

  const user = await Usuario.findOne({ username: data.username })
  return user
}

async function updateUserMongo(id, cambios) {
  const resultado = await Usuario.findByIdAndUpdate(id, cambios)
  return resultado
}

async function deleteUserMongo(user) {
  const resultado = await Usuario.delete(user)
  return resultado
}


module.exports = {
  createUserMongo,
  getUserMongo,
  updateUserMongo,
  deleteUserMongo
}