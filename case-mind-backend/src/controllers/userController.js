const express = require('express')
const HttpStatus = require('http-status')
const User = require('../models/User')
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

module.exports = (app) => app.use('/application', router)
