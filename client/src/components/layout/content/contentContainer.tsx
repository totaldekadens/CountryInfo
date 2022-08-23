import { FC } from "react"
import { Route, Routes } from "react-router-dom";
import CountryPage from "../../pages/countryPage";
import FrontPage from "../../pages/frontPage";
import CountryList from "./countryList";


const ContentContainer: FC = () => {
    // Todo: Fix all routes!
    return (
        <>
            <Routes>
                <Route path="/" element={ <FrontPage /> } />
                <Route path="/country" element={ <CountryPage /> } />
                <Route path="/region" element={ <CountryList /> } />
                <Route path="/search/:valuePar" element={ <CountryPage search={"Search result for: "} /> } />
            </Routes>
        </>
    )
}

export default ContentContainer