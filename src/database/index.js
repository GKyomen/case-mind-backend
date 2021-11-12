const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mindrest')
mongoose.Promise = global.Promise

module.exports = mongoose
