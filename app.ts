// const title: string = 'Good morning newbie. Welcome to the world of DENO.'

// const encoder = new TextEncoder();

// const encodedData = encoder.encode(title);

// Deno.writeFile('text.txt', encodedData).then(() => {
//     console.log('file created and updated with text.');
// });

const body: string = 'Hello World!!!'

const server = Deno.serve({port: 8000, hostname: "127.0.0.1"},  (_req) => new Response(body));

server.finished.then(() =>{
    console.log('server created!')
});