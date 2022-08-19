import { CSSProperties, FC } from "react"
import { flexCenter, flexColumn, flexRowBetween, flexRowCenter } from "../../../style/common"
import CountryList from "./countryList"
import CountrySingle from "./countrySingle"
import SearchEngine from "../../interaction/search"
import { image, image2 } from "../../../data"

const FrontPage: FC = () => {
    return(
        <div style={{...flexColumn, ...container, position: "relative"}}>
            <SearchEngine heightButton={"50px"} heightInput={"20px"} widthInput={"300px"}/>
            <img 
                src={image2} 
                width="100%" 
                alt="world map transparent png pictures icons and png"
                style={{minHeight: "100vh", objectFit: "cover"}}
            />
        </div>
    )
}

const container: CSSProperties = {
    margin: "0px", 
    minHeight: "100vh", 
    alignItems: "center", 
}

export default FrontPage