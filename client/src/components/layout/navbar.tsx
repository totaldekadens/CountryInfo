import { FC, useContext, useState } from "react"
import {
    AppBar,
    Tab,
    Tabs,
    Toolbar,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import DrawerComp from "../interaction/drawer";
import { image, list } from "../../data/data";
import { RegionContext } from "../context/regionProvider";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { CountryContext } from "../context/countryProvider";
import SearchEngine from "../interaction/search";
import { getRegion } from "../../helpers/fetchHelper";
import { colors } from '../../data/colors'

const Navbar: FC = () => {

    // Context
    const { region, setRegion } = useContext(RegionContext)
    const { setCountry } = useContext(CountryContext)

    // State
    const [value, setValue] = useState<boolean | number>(false);

    // Theme mediaquery
    const theme = useTheme();
    const isMdMatch = useMediaQuery(theme.breakpoints.down("md")); // if less than 900px match = true
    const isSmMatch = useMediaQuery(theme.breakpoints.down("sm")); // if less than 600px match = true

    // If value matches with a region in the api it will show up as a result
    const handleClick = async (region: any) => {
        try {
            setCountry([])
            let result = await getRegion(region)

            if (result) {
                setRegion(result)
            }
        } catch (err) {
            console.error(err)
        }
    }
    // Resets alla values when it comes to country and regions when yoy click on home button
    const handleHomeClick = () => {
        setCountry([])
        setRegion([])
        setValue(false) // tabs in nav
    }

    return (
        <AppBar sx={{ background: `${colors.fifth}`, opacity: "0.9"}}>
            <Toolbar>
                <Link to={"/"} >
                    <img onClick={handleHomeClick} src={image} width="42px" alt="world map" />
                </Link>
                {region.length > 0 ?
                    <SearchEngine
                        tabValue={setValue}
                        heightButton={"30px"}
                        heightInput={"0px"}
                        widthInput={ isSmMatch ? "150px" : "200px"}
                        type={"navbar"}
                        top={"-8px"}
                    />
                    : ""}
                {isMdMatch ? (
                    <>
                        <DrawerComp />
                    </>
                ) : (
                    <>
                        <Tabs
                            indicatorColor="primary"
                            textColor="primary"
                            sx={{ marginLeft: "auto" }}
                            value={value}
                            onChange={(e, value) => setValue(value)}
                        >
                            {list.map((item) => {
                                return (
                                    <Tab
                                        key={item}
                                        onClick={() => { handleClick(item) }}
                                        label={item}
                                        component={RouterLink} to={`/country`}
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