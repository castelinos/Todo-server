import express from "express";
import cors from "cors";
import config from "./config.js";

import todoRoutes from './routes/todo.js';
import userRoutes from './routes/users.js';

import connectDB from "./lib/db.js";
const server = express();

const corsOptions = { 
    origin: 'http://localhost:5173', 
    optionsSuccessStatus:200, 
    credentials: true 
};

server.use(cors(corsOptions));
server.use(express.json());

server.use('/', userRoutes);
server.use('/todo', todoRoutes);

connectDB();
server.listen( config.server.port, ()=>{
    console.log('Todo server started on Port:', config.server.port);
})