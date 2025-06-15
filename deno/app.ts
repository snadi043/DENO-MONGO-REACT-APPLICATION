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


// middleware in the OAK framework which is similar to node middleware but in OAK a context is provided on every middleware
// which handles the responses of that middleware and passes to the next middleware compiled as a stack.
app.use(async (_ctx, next) => {
    console.log('Hello');
    await next();
})

// Configuring the 'Cross-Origin-Request-Sharing' mechanism in the application to avoid the errors when 
// the systems are communicating with each other and procesing the endpoints.
app.use(async(ctx, next) => {
    ctx.response.headers.set('Access-Control-Allow-Origin', '*');
    ctx.response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    ctx.response.headers.set('Access-Control-Allow-Credentials', 'true');
    await next();
});

app.use(todoRoutes.routes());
app.use(todoRoutes.allowedMethods());

await app.listen({port: 8000});

// const server = Deno.serve({hostname: "127.0.0.1"},  (_req) => new Response(body));

// server.finished.then(() =>{
//     console.log('server created!')
// });