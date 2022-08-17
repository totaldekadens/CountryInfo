import { FC } from "react"
import { CountryProvider } from "../context/countryProvider"
import { RegionProvider } from "../context/regionProvider"
import ContentContainer from "./content/contentContainer"
import Navbar from "./navbar"

const Layout: FC = () => {
    return(
        <div>
            <RegionProvider>
                <CountryProvider>
                    <Navbar/>
                    <ContentContainer/>
                </CountryProvider>
            </RegionProvider>
        </div>
    )
}

export default Layout