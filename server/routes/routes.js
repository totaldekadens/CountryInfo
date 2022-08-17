import noteRoutes from "./noteRouter.js"
import countryRoutes from "./countryRouter.js";

const routes = (app, fs) => {
    noteRoutes(app, fs);
    countryRoutes(app)
}

export default routes