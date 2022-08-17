import express from "express";
import fetch from 'node-fetch'
import cors from 'cors';

const app = express()
const port = 4000

app.get("/api", (req, res) => {
    res.send("Server is running")
})

app.use(cors());

// GET all countries within a region
app.get("/api/external/region/:region", async (req, res) => {
    
    const region = req.params.region

    let response = await fetch(`https://restcountries.com/v3.1/region/${region}`)
    let result = await response.json();
    res.json(result)
})

// GET specific country
app.get("/api/external/country/:country", async (req, res) => {
    
    const country = req.params.country

    let response = await fetch(`https://restcountries.com/v3.1/name/${country}`)
    let result = await response.json();
    res.json(result)
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

