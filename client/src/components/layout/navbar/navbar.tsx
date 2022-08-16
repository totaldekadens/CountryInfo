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
import DrawerComp from "./drawer";
import { list } from "../../../data";
import { RegionContext } from "../../context/regionProvider";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar: FC = () => {

    // Context
    const {region, setRegion} = useContext(RegionContext)

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

            let response = await fetch(`http://localhost:3000/api/external/region/${region}`)
            let result = await response.json();

            if(result) {
                setRegion(result)
            }   
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <AppBar sx={{ background: "#063970" }}>
            <Toolbar>
            <Link to={"/"} ><img src="https://www.freepnglogos.com/uploads/world-map-png/world-map-world-earth-globe-vector-graphic-pixabay-25.png" width="42px" alt="world map" /></Link>
                <Typography sx={{ fontSize: "2rem", paddingLeft: "5%" }}>
                        Country Info
                </Typography>
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
                    textColor="inherit"
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