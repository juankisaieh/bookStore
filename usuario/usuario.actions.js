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
  const resultado = await Producto.findByIdAndUpdate(id, cambios)
}


module.exports = {
  createUserMongo,
  getUserMongo,
  updateUserMongo
}