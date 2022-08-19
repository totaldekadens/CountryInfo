import noteRoutes from "./noteRoutes.js"
import countryRoutes from "./countryRoutes.js";

const routes = (app) => {
    noteRoutes(app)
    countryRoutes(app)
}

export default routes