import { FC, useContext } from "react"
import { flex } from "../../../style/common"
import { RegionContext } from "../../context/regionProvider"
import CountryList from "./countryList"
import CountrySingle from "./countrySingle"
import FrontPage from "./frontPage"

interface Props {
    search?: string
}

const Content: FC<Props> = (props) => {

    // Context
    const {region} = useContext(RegionContext)

    // If region has any value the list will show up instead of FrontPage and viceverca
    return region.length >= 1 ? (
        <div style={{...flex, margin: "100px 0px 10px 0px", width:"100%", justifyContent: "space-between"}}>
            <CountryList search={props.search}/>
            <CountrySingle/>
        </div>
    ) : <FrontPage/>
}

export default Content