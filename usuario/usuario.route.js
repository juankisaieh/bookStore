const express = require('express')
const router = express.Router()
const { createUser, loginController, readUser } = require("./usuario.controller")
const { verifyToken } = require("../utils/functions")
var jwt = require('jsonwebtoken')

async function postUser(req, res) {
    try {
      await createUser(req.body);

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
    let user = await readUser(req)
    if (user) {
      res.status(200).json({ user: user})
    } else {
      res.status(401).json({ msg: "Anauthorized"})
    }
}

async function patchUser(req, res) {
  try {
    verifyToken(req, res)
  } catch(e) {

  }
}

router.post("/", postUser)
router.post("/login", loginUser)
router.get("/", getUser)
router.patch("/", patchUser)

module.exports = router