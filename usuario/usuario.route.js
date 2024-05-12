const express = require('express')
const router = express.Router()
const { createUser, loginController, readUser, updateUser, softDeleteUser } = require("./usuario.controller")
const { verifyToken } = require("../utils/functions")
var jwt = require('jsonwebtoken')

async function postUser(req, res) {
    try {
      await createUser(req.body)

      res.status(200).json({
          mensaje: "Exito"
      })
    } catch(e) {
      res.status(400).json({
          mensaje: "Fallido"
      })
    }
}

async function loginUser(req, res) {
  //const token = await loginController(req.body)
  try {
    const token = await loginController(req.body)
    res.status(200).json({
      msg: "Exito",
      jwt: token
    })
  } catch(e) {
    
    res.status(401).json({
      msg: "Anauthorized"
    })
  }
}

async function getUser(req, res) {  
  try {
    let user = await readUser(req)
    res.status(200).json({ user: user})
  } catch (error) {
    res.status(401).json({ msg: "Anauthorized"})
  }
}

async function patchUser(req, res) {

  try {
    const updatedUser = await updateUser(req)
    res.status(200).json({ msg: "Exito" })
  } catch(e) {
    res.status(401).json({ msg: "Anauthorized" })
  }
}

async function deleteUser(req, res) {
  try {
    const response = await softDeleteUser(req)
    res.status(200).json({ msg: response})
  } catch (error) {
    res.status(401).json({ msg: "Anauthorized"})
  }
}

router.post("/", postUser)
router.post("/login", loginUser)
router.get("/", getUser)
router.patch("/", patchUser)
router.delete("/", deleteUser)

module.exports = router