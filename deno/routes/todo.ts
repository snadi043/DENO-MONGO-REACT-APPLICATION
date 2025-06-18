import { Router } from "https://deno.land/x/oak/mod.ts";

import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";

import { getDB } from '../helpers/db_client.ts';

const router = new Router();

interface Todo{
    id?: string,
    title: string
}

let todos: Todo[] = [];

router.get('/todos', async (ctx) => {
    const todos = await getDB().collection('todos').find();
    const transformedTodo = todos.map((todo: {_id: ObjectId, title: string}) => {return {id: todo._id.$oid, title: todo.title}});
    ctx.response.body = {todos: transformedTodo};
});

router.post('/todos', async (ctx) => {
    const titleValue = await ctx.request.body.json();
    const newTodo: Todo = {
        title: titleValue,
    };
    const id = await getDB().collection('todos').insertOne(newTodo);
    newTodo.id = id.$oid;

    ctx.response.body = {todos: newTodo, message: 'A new todo is created'};
});

router.put('/todos/:todoId', async (ctx) => {
    const tid = ctx.params.todoId;
    const data = await ctx.request.body.json();
    const todoIndex = todos.findIndex(todo => {return todo.id === tid});
    todos[todoIndex] = {id: todos[todoIndex].id, title: data};
    ctx.response.body = {message: 'Todo is updated.'}
});

router.delete('/todos/:todoId', (ctx) => {
    const tid = ctx.params.todoId;
    todos = todos.filter(todo => todo.id !== tid);
    ctx.response.body = {message: 'Todo deleted', todo: todos};
});

export default router;