const fs = require("fs");
const https = require("https");
const express = require("express");
const socketIo = require("socket.io");
const path = require("path");
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const key=fs.readFileSync("./certs/cert.key")
const cert= fs.readFileSync("./certs/cert.crt");

const server = https.createServer({
    key,
    cert
},app);

const io = socketIo(server,{
    cors: {
        origin: "https://localhost:5173",
    credentials: true,
    }
});



const PORT = process.env.PORT || 8080;

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


module.exports = {
    io,server,app
}