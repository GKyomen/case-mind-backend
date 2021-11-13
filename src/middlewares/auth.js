const HttpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const auth = require('../config/auth.json')

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader)
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send({ error: 'Erro: Nenhum Token informado' })

  const partsToken = authHeader.split(' ')

  if (!partsToken.length === 2)
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send({ error: 'Erro: Erro no Token' })

  const [part, token] = partsToken

  if (!/^Bearer$/i.test(part))
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send({ error: 'Erro: Token mal formatado' })

  jwt.verify(token, auth.secret, function (err, decodedUser) {
    if (err)
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ error: 'Erro: Token inválido' })

    req.userId = decodedUser.id

    return next()
  })
}
