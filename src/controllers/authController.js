const express = require('express')
const HttpStatus = require('http-status')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const User = require('../models/User')
const router = express.Router()

function genToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 864000,
  })
}

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
      originalLevel: req.body.level,
    })

    await newUser.save()

    newUser.password = undefined

    return res
      .status(HttpStatus.CREATED)
      .send({ newUser, token: genToken({ id: newUser.id }) })
  } catch (error) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: 'Não foi possível cadastrar o usuário' })
  }
})

router.post('/login', async (req, res) => {
  const { user: usuário, password } = req.body

  let user = await User.findOne({ email: usuário }).select('+password')

  if (!user) {
    user = await User.findOne({ cpf: usuário }).select('+password')

    if (!user)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: 'Usuário não encontrado' })
  }

  if (!(await bcrypt.compare(password, user.password)))
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: 'Senha incorreta, tente novamente' })

  if (user.level === 0)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: 'Usuário desativado. Verifique com o administrador' })

  user.password = undefined

  res.send({ user, token: genToken({ id: user.id }) })
})

module.exports = (app) => app.use('/auth', router)
