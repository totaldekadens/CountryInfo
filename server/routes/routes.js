import noteRoutes from "./noteRouter.js"
import countryRoutes from "./countryRouter.js";

const routes = (app, fs, data) => {
    noteRoutes(app, fs, data);
    countryRoutes(app)
}

export default routes