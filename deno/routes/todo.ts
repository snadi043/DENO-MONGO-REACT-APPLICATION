import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

interface Todo{
    id: string,
    title: string
}

let todos: Todo[] = [];

router.get('/todos', (ctx) => {
    ctx.response.body = {todos: todos};
});

router.post('/todos', async (ctx) => {
    const titleValue = await ctx.request.body.json();
    const newTodo: Todo = {
        id: new Date().toISOString(),
        title: titleValue,
    };
    todos.push(newTodo);
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