const express = require('express') // Node web server framework
const mongoose = require('mongoose') // Object data modeling for mongoDB
const cors = require('cors') // Allow endpoint to accept requests
const todoRouter = require('./routes/todo')
require('dotenv').config() // Allow env

const {
  MONGO_DB_CLUSER_CONNECTION_STRING: connectionString,
  MONGO_DB_CLUSTER_USER_NAME: userName,
  MONGO_DB_CLUSTER_USER_PASS: userPass,
  PORT
} = process.env
const app = express()
app.use(cors())

// *---------* Endpoints *---------*
app.use('/api', todoRouter)

// *---------* Connect to DB *---------*
const connectMongo = () => {
  console.log('Connecting to MongoDB Cluster... ')
  return new Promise((res, rej) => {
    mongoose
      .connect(`mongodb+srv://${userName}:${userPass}@${connectionString}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .catch(error => {
        rej(new Error(`Unable to establish connection -> ${error}`))
      })
    mongoose.connection.on('error', error => {
      rej(
        new Error(
          `Connection was established but another error occured -> ${error}`
        )
      )
    })
    mongoose.connection.once('open', _ => {
      res('\x1b[35mSuccessfully connected to MongoDB Cluster\x1b[0m')
    })
  })
}
// *---------* Start Server *---------*
const startExpress = () => {
  console.clear()
  console.log('Starting Express server ... ')
  return new Promise((res, rej) => {
    app
      .listen(PORT, _ => {
        res(`\x1b[36mServer listening on port \x1b[33m${PORT}\x1b[0m`)
      })
      .on('error', e => {
        rej(new Error(e))
      })
  })
}
// *---------* Boot Backend *---------*
const startProcess = () => {
  const pipeline = [startExpress(), connectMongo()]
  Promise.all(pipeline)
    .then(results => {
      results.forEach(result => {
        console.log(result)
      })
    })
    .catch(error => {
      console.error(error)
    })
}
startProcess()
