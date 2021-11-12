const express = require('express')
const HttpStatus = require('http-status')
const bcrypt = require('bcrypt')

const User = require('../models/User')

const router = express.Router()

router.post('/register', async (req, res) => {
  const { email, cpf } = req.body

  try {
    if (await User.findOne({ email }))
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: 'Já existe um usuário cadastrado com este email' })

    if (await User.findOne({ cpf }))
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: 'Já existe um usuário cadastrado com este CPF' })

    const newUser = new User({
      name: req.body.name,
      cpf: req.body.cpf,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      level: req.body.level,
    })

    await newUser.save()

    newUser.password = undefined

    return res.status(HttpStatus.CREATED).send({ newUser })
  } catch (error) {
    console.log(error)
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: 'Não foi possível cadastrar o usuário' })
  }
})

module.exports = (app) => app.use('/auth', router)
