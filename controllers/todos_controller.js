const Todo = require('../models/todo')

const express = require('express')
const router = express.Router()

// TODO. import express and create a Router, replace the methods below with routes e.g.
// router.post('/', function(req,res) => {
//  Todo.create(req.body, function (err, todo) {
//    res.json(todo)
//  }
// })

router.get('/', function (req, res, next) {
  Todo.find({}, function (err, todoList) {
    if (err) {
      return next(err)
    }
    res.render('./index', {
      todoList: todoList
    })
    console.log('Found something :)')
  })
})

router.post('/', function (req, res) {
  Todo.create(req.body, function (err, todo) {
    if (err) {
      console.log(err)
      return
    }
    res.send(todo)
  })
})

router.get('/:id', function (req, res) {
  Todo.findById(req.params.id, function (err, output) {
    if (err) {
      console.error(err)
      return
    }
    res.send(output)
    console.log(output)
  })
})

router.put('/:id', function (req, res) {
  Todo.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed
  }, {new: true}, function (err, output) {
    if (err) {
      console.error(err)
      return
    }
    res.send(output)
  })
})

router.delete('/:id', function (req, res) {
  Todo.findByIdAndRemove(req.params.id, function (err, output) {
    if (err) {
      console.error(err)
      return
    }
    res.send({
      message: 'success deleting todo with id' + req.params.id
    })
  })
})

module.exports = router
