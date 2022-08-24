
import fetch from 'node-fetch'

// GET all countries  (EXTERNAL)
export const getAllCountries =  async (req, res) => {
    try {

        let response = await fetch(`https://restcountries.com/v3.1/all`)
        let result = await response.json();

        if(!result || result.status == 500) {
            throw new Error("Something wrong with external api")
        } 
        
        res.json(result)

    } catch(err) {
        res.status(500).json(err.message)
    }
}

// GET all countries within a region (EXTERNAL)
export const getRegion = async (req, res) => {
    try {

        let response = await fetch(`https://restcountries.com/v3.1/region/${req.params.region}`)
        let result = await response.json();

        if(!result || result.status == 404) {
            throw new Error("Region does not exist")
        } 
        
        res.json(result)

    } catch(err) {
        res.status(404).json(err.message)
    }
}

// GET specific country (EXTERNAL)
export const getCountry =  async (req, res) => {
    try {

        let response = await fetch(`https://restcountries.com/v3.1/name/${req.params.country}`)
        let result = await response.json();

        if(!result || result.status == 404) {
            throw new Error("Country does not exist")
        } 
        
        res.json(result)

    }catch(err) {
        res.status(404).json(err.message)
    }
}