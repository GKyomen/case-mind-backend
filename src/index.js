const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

require('./controllers/authController')(app)
require('./controllers/userController')(app)

app.listen(5000, () => {
  console.log('API running on http://localhost:5000')
})
