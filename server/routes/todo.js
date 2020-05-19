const router = require('express').Router()
const Todo = require('../models/Todo')

// Get all todos
router.get('/todos', async (req, res) => {
  const todos = await Todo.find({}).catch(e => console.log(e))
  res.status(200).json(todos)
})

// Get todo by id
router.get('/todos:id', async ({ params: { id } }, res) => {
  const todoItem = await Todo.findById(id).catch(e => console.log(e))
  res.status(200).json(todoItem)
})

// Post todo
router.post('/todo', async ({ body: { description } }, res) => {
  const todo = new Todo({
    description: description
  })

  await todo.save()
  res.status(200).json(todo)
})

// Delete single todo by id
router.delete('/todo:id', async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id })
    res.status(200).send()
  } catch (e) {
    res.status(404).send()
  }
})

module.exports = router
