const express = require('express')
const router = express.Router()
const { createUser } = require("./usuario.controller")


async function PostUser(req, res) {
    try {
      await createUser(req.body);

      res.status(200).json({
          mensaje: "Exito"
      })
    } catch(e) {
        const err = JSON.parse(e.message);
        res.status(err.code).json({
            mensaje: "Fallido",
            err: err.msg,
        })
    }
}

router.post("/", PostUser)

module.exports = router