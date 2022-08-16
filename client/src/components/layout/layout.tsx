import { FC } from "react"
import { CountryProvider } from "../context/countryProvider"
import { RegionProvider } from "../context/regionProvider"
import ContentContainer from "./content/contentContainer"
import Footer from "./footer"
import Navbar from "./navbar/navbar"

const Layout: FC = () => {
    return(
        <div>
            <RegionProvider>
                <CountryProvider>
                    <Navbar/>
                    <ContentContainer/>
                    <Footer/>
                </CountryProvider>
            </RegionProvider>
        </div>
    )
}

export default Layout