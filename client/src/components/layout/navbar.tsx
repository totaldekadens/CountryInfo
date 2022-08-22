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
import { image, list } from "../../data";
import { RegionContext } from "../context/regionProvider";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { CountryContext } from "../context/countryProvider";
import SearchEngine from "../interaction/search";
import { getRegion } from "../../helpers/fetchHelper";

const Navbar: FC = () => {

    // Context
    const { region, setRegion } = useContext(RegionContext)
    const { setCountry } = useContext(CountryContext)

    // State
    const [value, setValue] = useState<boolean | number>(false);

    // Check theme mediaquery
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

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
        setValue(false)
    }

    return (
        <AppBar sx={{ background: "#EFF6FF" }}>
            <Toolbar>
                <Link to={"/"} >
                    <img onClick={handleHomeClick} src={image} width="42px" alt="world map" />
                </Link>
                {region.length > 0 ?
                    <SearchEngine
                        tabValue={setValue}
                        heightButton={"30px"}
                        heightInput={"0px"}
                        widthInput={"200px"}
                        type={"navbar"}
                        top={"-8px"}
                    />
                    : ""}
                {isMatch ? (
                    <>
                        <DrawerComp />
                    </>
                ) : (
                    <>
                        <Tabs
                            sx={{ marginLeft: "auto" }}
                            indicatorColor="primary"
                            textColor="primary"
                            value={value}
                            onChange={(e, value) => setValue(value)}
                        >
                            {list.map((item) => {
                                return (
                                    <Tab
                                        key={item}
                                        onClick={() => { handleClick(item) }}
                                        label={item}
                                        component={RouterLink} to={`/${item}`}
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