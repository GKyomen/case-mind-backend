const express = require('express')
const HttpStatus = require('http-status')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const router = express.Router()
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)

router.get('/users', async (req, res) => {
  try {
    const admin = await User.findById(req.userId)

    if (admin.level !== 999)
      return res.status(HttpStatus.UNAUTHORIZED).send({
        error: 'Erro: Somente administradores podem ver todos os usuários',
      })

    const users = await User.find()

    return res.send({ users })
  } catch (error) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: 'Erro: Não foi possível listar os usuários' })
  }
})

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)

    return res.send({ user })
  } catch (err) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: 'Erro: Não foi possível mostrar o usuário' })
  }
})

router.put('/:userId', async (req, res) => {
  try {
    const newData = req.body

    if (newData.password)
      newData.password = bcrypt.hashSync(req.body.password, 10)

    const userUpdated = await User.findByIdAndUpdate(
      req.params.userId,
      newData,
      {
        new: true,
      }
    )

    await userUpdated.save()
    return res.send({ userUpdated })
  } catch (err) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: 'Erro: Não foi possível atualizar o usuário' })
  }
})

module.exports = (app) => app.use('/application', router)
