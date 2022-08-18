import fetch from 'node-fetch'

const countryRoutes = (app) => {

    // GET all countries  (EXTERNAL)
    app.get("/api/external/all", async (req, res) => {
        try {

            let response = await fetch(`https://restcountries.com/v3.1/all`)
            let result = await response.json();

            if(!result) {
                throw new Error("Something wrong with external api")
            } 
            
            res.json(result)

        } catch(err) {
            res.status(500).json(err.message)
        }
    })

    // GET all countries within a region (EXTERNAL)
    app.get("/api/external/region/:region", async (req, res) => {
        try {
            const region = req.params.region

            let response = await fetch(`https://restcountries.com/v3.1/region/${region}`)
            let result = await response.json();

            if(!result) {
                throw new Error("Region does not exist")
            } 
            
            res.json(result)

        } catch(err) {
            res.status(404).json(err.message)
        }
    })

    // GET specific country (EXTERNAL)
    app.get("/api/external/country/:country", async (req, res) => {
        try {
            const country = req.params.country

            let response = await fetch(`https://restcountries.com/v3.1/name/${country}`)
            let result = await response.json();
    
            if(!result) {
                throw new Error("Country does not exist")
            } 
            
            res.json(result)

        }catch(err) {
            res.status(404).json(err.message)
        }
    })
}

export default countryRoutes