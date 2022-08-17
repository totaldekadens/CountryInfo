import { CSSProperties, FC } from "react"
import { flexCenter, flexColumn, flexRowBetween, flexRowCenter } from "../../../style/common"
import CountryList from "./countryList"
import CountrySingle from "./countrySingle"
import SearchEngine from "../../interaction/search"

const FrontPage: FC = () => {
    return(
        <div style={{...flexColumn, ...container}}>
            <SearchEngine/>
            {/* Get new image */}
            <img 
                src="https://www.freepnglogos.com/uploads/world-map-png/world-map-transparent-png-pictures-icons-and-png-12.png" 
                width="70%" 
                alt="world map transparent png pictures icons and png" 
            />
        </div>
    )
}

const container: CSSProperties = {
    margin: "150px 0px 10px 0px", 
    height: "100%", 
    alignItems: "center", 
    rowGap: "30px"
}

export default FrontPage