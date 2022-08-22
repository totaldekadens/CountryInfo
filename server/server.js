import express from "express";
import cors from 'cors';
import {router as noteRouter } from './routes/noteRouter.js'
import {router as countryRouter } from './routes/countryRouter.js'

const app = express()
const port = 4000

app.get("/api", (req, res) => {
    res.send("Server is running")
})

app.use(express.json())
app.use(cors());

app.use("/api/notes", noteRouter)
app.use("/api/external", countryRouter)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

