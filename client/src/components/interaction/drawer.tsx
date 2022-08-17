import { FC, useState } from "react";
import { list } from "../../data";
import {
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const DrawerComp: FC = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <>
        <Drawer
            anchor="left"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            PaperProps={{sx: {width: "240px", alignItems: "center", paddingTop: "30px"}}}
        >
            <List sx={{width: "100%", alignItems: "center"}}>
            {list.map((item, index) => (
                <ListItemButton key={index}>
                    <ListItemIcon>
                        <ListItemText primaryTypographyProps={{fontSize: '30px'}} >{item}</ListItemText>
                    </ListItemIcon>
                </ListItemButton>
            ))}
            </List>
        </Drawer>
        <IconButton
            sx={{ color: "white", marginLeft: "auto" }}
            onClick={() => setOpenDrawer(!openDrawer)}
        >
            <MenuIcon color="inherit" />
        </IconButton>
        </>
    );
};

export default DrawerComp;