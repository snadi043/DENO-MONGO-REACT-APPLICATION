// const title: string = 'Good morning newbie. Welcome to the world of DENO.'

// const encoder = new TextEncoder();

// const encodedData = encoder.encode(title);

// Deno.writeFile('text.txt', encodedData).then(() => {
//     console.log('file created and updated with text.');
// });

// Importing the "OAK" framework package with the DENO supported URL imports into the application.
import { Application } from "https://deno.land/x/oak/mod.ts";

import todoRoutes from './routes/todo.ts';

 // The application class manages the HTTP server, handles the middleware functions and deals with the errors 
const app = new Application();

app.use(todoRoutes.routes());
app.use(todoRoutes.allowedMethods());

// middleware in the OAK framework which is similar to node middleware but in OAK a context is provided on every middleware
// which handles the responses of that middleware and passes to the next middleware compiled as a stack.
app.use(async (_ctx, next) => {
    console.log('Hello');
    await next();
})

await app.listen({port: 8000});

// const server = Deno.serve({hostname: "127.0.0.1"},  (_req) => new Response(body));

// server.finished.then(() =>{
//     console.log('server created!')
// });