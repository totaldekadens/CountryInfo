import express from "express";
import cors from 'cors';
import data from './data/data.json' assert {type: "json"};
import  fs  from 'fs';
import routes from "./routes/routes.js";

const app = express()
const port = 4000

app.get("/api", (req, res) => {
    res.send("Server is running")
})

app.use(cors());

// Sending in "data" to secure it in overlapping process with fs
routes(app,fs, data);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

