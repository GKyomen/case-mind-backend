import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/mindrest', { useMongoClient: true })
mongoose.Promise = global.Promise

module.exports = mongoose
