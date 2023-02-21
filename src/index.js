import app from "./app";
import { Server as websocketserver } from "socket.io";
import http from "http";

import sockets from "./sockets";


import * as dotenv from 'dotenv'
import dbConnection from './database/db';
dotenv.config();

// connection to database
dbConnection()


const port = process.env.PORT || 3001;
const server = http.createServer(app)
const httpServer = server.listen(port);
const io = new websocketserver(httpServer)
sockets(io);


app.get('/', (req, res) => {
  res.send("Server")
})


  console.log(`Server listening on http://localhost:${port}`);