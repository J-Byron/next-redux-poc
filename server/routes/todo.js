const router = require('express').Router()
const Todo = require('../models/Todo')


// Get all todos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find({}).catch(e => console.log(e))
    res.status(200).json(todos)
  } catch (error) {
    res.status(400)
  }
})

// Get todo by id
router.get('/todos:id', async ({ params: { id } }, res) => {
  try {
    const todoItem = await Todo.findById(id).catch(e => console.log(e))
    res.status(200).json(todoItem)
  } catch (error) {
    res.status(400)
  }
})

// Post todo
router.post('/todo', async (req, res) => {
  try {
    const { description } = req.body

    const todo = new Todo({
      description: description
    })

    await todo.save()
    res.status(200).send()
  } catch (error) {
    res.status(400)
  }
})

// Delete single todo by id
router.delete('/todo/:id', async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id })
    res.status(200).send()
  } catch (e) {
    res.status(400)
  }
})

router.put('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { updatedDescription } = req.body
    const item = await Todo.findByIdAndUpdate(
      { _id: `${id}` },
      { description: updatedDescription }
    ).catch(e => {
      console.log(e)
    })

    res.status(200).json(item)
  } catch (error) {
    res.status(400)
  }
})

module.exports = router
