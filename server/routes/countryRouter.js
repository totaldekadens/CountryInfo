import fetch from 'node-fetch'

const countryRoutes = (app) => {

    // GET all countries within a region (EXTERNAL)
    app.get("/api/external/region/:region", async (req, res) => {
        
        const region = req.params.region

        let response = await fetch(`https://restcountries.com/v3.1/region/${region}`)
        let result = await response.json();
        res.json(result)
    })

    // GET specific country (EXTERNAL)
    app.get("/api/external/country/:country", async (req, res) => {
        
        const country = req.params.country

        let response = await fetch(`https://restcountries.com/v3.1/name/${country}`)
        let result = await response.json();
        res.json(result)
    })

}

export default countryRoutes