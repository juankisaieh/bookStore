const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

const userRoutes = require("./usuario/usuario.route")
app.use("/user", userRoutes)

mongoose.connect(process.env.MONGO_URI)

app.listen(8080)
console.log("listening!!")