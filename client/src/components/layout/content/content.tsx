import { FC, useContext } from "react"
import { RegionContext } from "../../context/regionProvider"
import CountryPage from "../../pages/countryPage"
import FrontPage from "../../pages/frontPage"


const Content: FC = () => {

    // Context
    const {region} = useContext(RegionContext)

    return region.length > 0 ? 
        <CountryPage /> : <FrontPage/>
}

export default Content