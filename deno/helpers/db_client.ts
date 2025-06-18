import { MongoClient, Database } from "https://deno.land/x/mongo@v0.34.0/mod.ts";

let db: Database;

export function connectDB(){
    const client = new MongoClient();
    client.connect('mongodb+srv://snadi043:FMtFKqvQQggowsRd@denotodoapplication.migoxtv.mongodb.net/todo-app');
    db = client.database('todo-app');
}

// const client = new MongoClient();

// const db = await client.connect({
//   db: 'todos-app',
//   tls: true,
//   servers: [
//     {
//       host: 'localhost',
//       port: 27017,
//     },
//   ],
//   credential: {
//     username: 'snadi043',
//     password: 'FMtFKqvQQggowsRd',
//     mechanism: 'SCRAM-SHA-1',
//   },
// });

export function getDB(){
    return db;
};
