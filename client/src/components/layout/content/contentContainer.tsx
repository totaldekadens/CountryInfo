import { FC } from "react"
import { Route, Routes } from "react-router-dom";
import Content from "./content";
import CountryPage from "../../pages/countryPage";
import CountrySingle from "./countrySingle";
import FrontPage from "../../pages/frontPage";

const ContentContainer: FC = () => {
    // Todo: Fix all routes!
    return (
        <>
            <Routes>
                <Route path="/" element={ <FrontPage /> } />
                <Route path="/:regionPar" element={ <CountryPage /> } />
                <Route path="/search/:value" element={ <CountryPage search={"Search result for: "} /> } />
                <Route path="/:regionPar/:countryPar" element={ <CountryPage /> } />
            </Routes>
        </>
    )
}

export default ContentContainer