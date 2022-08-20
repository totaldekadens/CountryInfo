import { FC } from "react"
import { Route, Routes } from "react-router-dom";
import Content from "./content";
import FrontPage from "./frontPage";

const ContentContainer: FC = () => {
    // Todo: Fix all routes!
    return (
        <>
            <Routes>
                <Route path="/" element={ <FrontPage /> } />
                <Route path="/region" element={ <Content /> } />
                <Route path="/search/:value" element={ <Content search={"Search result for: "} /> } />
            </Routes>
        </>
    )
}

export default ContentContainer