import { FC, useContext, useState } from "react"
import {
    AppBar,
    Tab,
    Tabs,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import DrawerComp from "../interaction/drawer";
import { image, list } from "../../data";
import { RegionContext } from "../context/regionProvider";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { CountryContext } from "../context/countryProvider";
import SearchEngine from "../interaction/search";

const Navbar: FC = () => {

    // Context
    const {region, setRegion} = useContext(RegionContext)
    const {setCountry} = useContext(CountryContext)

    // State
    const [value, setValue] = useState();

    // Check theme
    const theme = useTheme();
    /* console.log(theme); */
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
 /*    console.log(isMatch); */

    // If value matches with a region in the api it will show up as a result
    const handleClick = async(region: any) => {
        try {
            let response = await fetch(`http://localhost:4000/api/external/region/${region}`)
            let result = await response.json();

            if(result) {
                setRegion(result)
            }   
        } catch(err) {
            console.error(err)
        }
    }

    const handleHomeClick = () => {
        setCountry([])
        setRegion([])
    }

    return (
        <AppBar sx={{ background: "#EFF6FF" }}>
            <Toolbar>
            <Link to={"/"} ><img onClick={handleHomeClick} src={image} width="42px" alt="world map" /></Link>
            {region.length > 0 ? <SearchEngine heightButton={"30px"} heightInput={"0px"} widthInput={"200px"} type={"navbar"} top={"-8px"} /> : ""}
            {isMatch ? (
                <>
                <DrawerComp />
                </>
            ) : (
                <>
                {/* 
                    MUI: The `value` provided to the Tabs component is invalid.
                    None of the Tabs' children match with "undefined".
                    You can provide one of the following values: 0, 1, 2, 3, 4. 
                    -- Får problem när ingen är vald.
                */}
                <Tabs
                    sx={{ marginLeft: "auto"}}
                    indicatorColor="primary"
                    textColor="primary"
                    value={value}
                    onChange={(e, value) => setValue(value)}
                >
                    {list.map((item) => {
                        return (
                            <Tab 
                                key={item} 
                                onClick={() => {handleClick(item)}} 
                                label={item} 
                                component={RouterLink} to="/region"
                            />
                        )
                    })}
                </Tabs>
                </>
            )}
            </Toolbar>
        </AppBar>
    ) 
}

export default Navbar