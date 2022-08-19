import { getAllCountries, getRegion, getCountry } from '../controllers/countryControllers.js'

const countryRoutes = (app) => {

    // GET all countries  (EXTERNAL)
    app.route("/api/external/all")
        .get(getAllCountries)

    // GET all countries within a region (EXTERNAL)
    app.route("/api/external/region/:region")
        .get(getRegion)
    
    // GET all countries within a region (EXTERNAL)
    app.route("/api/external/country/:country")
        .get(getCountry)
}


export default countryRoutes