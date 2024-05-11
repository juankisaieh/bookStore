const Usuario = require("./usuario.model")

async function createUserMongo(datos) {
  const createdUser = await Usuario.create(datos)

  return createdUser;
}

module.exports = {
  createUserMongo
}