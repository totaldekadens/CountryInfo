import express from "express";
import cors from 'cors';
import  fs  from 'fs';
import routes from "./routes/routes.js";

const app = express()
const port = 4000

app.get("/api", (req, res) => {
    res.send("Server is running")
})

app.use(express.json())
app.use(cors());

routes(app, fs);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

