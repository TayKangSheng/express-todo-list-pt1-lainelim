const mongoose = require('mongoose')
const todosController = require('./controllers/todos_controller')
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const bodyParser = require('body-parser')

mongoose.connect('mongodb://lainelim:22038899@ds141697.mlab.com:41697/todolistlainelim')
mongoose.Promise = global.Promise

app.set('view engine', 'ejs')
app.use(bodyParser.json())

app.use(todosController)

// app.get('/db', function(req, res){
//   require('./models/todo').find({}, function(err, output){
//     if (err){
//       console.log(err)
//     }
//     console.log('Found something')
//     console.log(output)
//   })
// })
// startup API middleware, all requests go to /startiups controller

app.use(function (err, req, res, next) {
  res.send({
    error: err.message
  })
})

// app.get('/', function (req, res) {
//   res.send('my todo lists')
// })

app.listen(port, function () {
  console.log('express todo is running on ' + port)
})

// TODO. include express and body-parser, plugin in the todos controller and start listening
