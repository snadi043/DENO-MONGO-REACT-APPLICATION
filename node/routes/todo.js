const express = require('express');

const router = express.Router();

let todos = [];

router.get('/todos', (req, res, next) => {
    res.status(200).json({todos: todos, message: 'Fetched todos'});
});

router.post('/todos', (req, res, next) => {
    const newTodo = {id: new Date().toISOString(), title: req.body.title}
    todos.push(newTodo);
    res.status(201).json(
        {
            todos: newTodo,
            message: 'A new todo is created.'
        });
});

router.put('/todos/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex(todo => {return todo.id === tid});
    todos[todoIndex] = {id: todos[todoIndex].id, tistle: req.body.title};
    res.status(200).json({message: 'Todo is updated!'});
});

router.delete('/todos/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    todos = todos.filter(todo => todo.id !== tid);
    res.status(200).json({message: 'Todo Deleted.'});
});

module.exports = router;