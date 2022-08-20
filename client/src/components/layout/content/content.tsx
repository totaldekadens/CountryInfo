import { FC, useContext } from "react"
import { useParams } from "react-router-dom"
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
    // Gets the search value from url
    const { value } = useParams();

    // If region has any value, the list will show up instead of FrontPage and viceverca
    return region.length >= 1 ? (
        <>
        <div style={{...flex, width: "100vw", justifyContent: "center", margin: "100px 0px 10px 0px"}}>   
            <h1 style={{ paddingLeft: '20px', fontSize: props.search ? "20px" : "50px", color: "#063960"}}>
                { props.search ? props.search + "'" + value + "'" : region[0].region }
            </h1> 
        </div>
        <div style={{...flex, width:"100%", justifyContent: "center"}}>
            <CountryList search={props.search}/>
            <CountrySingle/>
        </div>
        </>
    ) : <FrontPage/>
}

export default Content