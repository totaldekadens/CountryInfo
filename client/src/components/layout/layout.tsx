import { FC } from "react"
import { CommentsByCountryProvider } from "../context/commentsByCountryProvider"
import { CountryProvider } from "../context/countryProvider"
import { RegionProvider } from "../context/regionProvider"
import ContentContainer from "./content/contentContainer"
import Navbar from "./navbar"

const Layout: FC = () => {
    return(
        <div>
            <RegionProvider>
                <CountryProvider>
                    <CommentsByCountryProvider>
                        <Navbar/>
                        <ContentContainer/>
                    </CommentsByCountryProvider>
                </CountryProvider>
            </RegionProvider>
        </div>
    )
}

export default Layout