import { FC } from "react"
import { Route, Routes } from "react-router-dom";
import Content from "./content";
import FrontPage from "./frontPage";

const ContentContainer: FC = () => {
    // Todo: Add another route for country? 
    return (
        <>
            <Routes>
                <Route path="/" element={ <FrontPage /> } />
                <Route path="/region" element={ <Content /> } />
            </Routes>
        </>
    )
}



export default ContentContainer