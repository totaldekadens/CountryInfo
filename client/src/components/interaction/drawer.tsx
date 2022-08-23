import { FC, useState, useContext } from "react";
import { list } from "../../data/data";
import {
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { getRegion } from "../../helpers/fetchHelper";
import { CountryContext } from "../context/countryProvider";
import { RegionContext } from "../context/regionProvider";
import { Link as RouterLink } from "react-router-dom";

const DrawerComp: FC = () => {

    // Context
    const { setRegion } = useContext(RegionContext)
    const { setCountry } = useContext(CountryContext)

    // State
    const [openDrawer, setOpenDrawer] = useState(false);

    // If value matches with a region in the api it will show up as a result
    const handleClick = async (region: any) => {
        try {
            // Closes the drawer and resets country when a new region gets clicked on
            setOpenDrawer(false)
            setCountry([])

            let result = await getRegion(region)

            if (result) {
                setRegion(result)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                PaperProps={{ sx: { width: "240px", alignItems: "center", paddingTop: "30px" } }}
            >
                <List sx={{ width: "100%", alignItems: "center" }}>
                    {list.map((item, index) => (
                        <ListItemButton
                            key={index}
                            onClick={() => { handleClick(item) }}
                            component={RouterLink} to={`/country`}
                        >
                            <ListItemIcon>
                                <ListItemText primaryTypographyProps={{ fontSize: '30px' }} >{item}</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <IconButton
                sx={{ color: "black", marginLeft: "auto" }}
                onClick={() => setOpenDrawer(!openDrawer)}
            >
                <MenuIcon color="inherit" />
            </IconButton>
        </>
    );
};

export default DrawerComp;