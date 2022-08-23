import { FC, useContext } from "react"
import { RegionContext } from "../../context/regionProvider"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { CountryContext } from "../../context/countryProvider";
import { flexColumn } from "../../../style/common";
import { Link as RouterLink } from "react-router-dom";
import { CommentsByCountryContext } from "../../context/commentsByCountryProvider";
import { getAllCommentsByCountry } from "../../../helpers/fetchHelper";
import { colors } from "../../../data/colors";
import { useMediaQuery, useTheme } from "@mui/material"

const CountryList: FC = () => {
    
    // Context
    const {region} = useContext(RegionContext)
    const {country , setCountry} = useContext(CountryContext)
    const {setComments} = useContext(CommentsByCountryContext)

    // Theme mediaquery
    const theme = useTheme();
    const isSmMatch = useMediaQuery(theme.breakpoints.down("sm"));
    
    const handleClick = async (chosenCountry: any) => {
        // Sets value (the object of the chosen country) to country(context). Will be shown in "CountrySingle"
        setCountry(chosenCountry)

        // Gets the chosen country's comments and updates the comment context. 
        let result = await getAllCommentsByCountry(chosenCountry.name.common)

        if(result) {
            setComments(result)
        }
    }

    return region.length > 0 ? (
        <>
        <div style={{...flexColumn, alignItems: "center"}}>
            {Object.keys(country).length > 0 ? <h3 style={{color: `${colors.primary}`}}>{region[0].region}</h3> : ""}
            <List dense sx={{ 
                width: isSmMatch ? '70%' : '100%', 
                maxWidth: 360, 
                bgcolor: 'background.paper', 
                maxHeight: "60vh", 
                overflowY: "scroll",
                backgroundColor: `${colors.fifth}`,
                boxShadow: "0px 0px 5px gray",
                border: `1px solid ${colors.third}`,
                borderRadius: "5px"  
            }}
            >
            {region.map((value: any) => {
                return (
                <ListItem
                    key={value.name.common}
                    disablePadding
                    onClick={() => {handleClick(value)}}
                    component={RouterLink} to= {`/country` }
                >
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar
                            alt={`Flag of ${value.name.common}`}
                            src={`${value.flags.png}`}
                            />
                        </ListItemAvatar>
                        <ListItemText sx={{color:"black"}} primary={`${value.name.common}`} />
                    </ListItemButton>
                </ListItem>
                ); 
            })}
            </List>
        </div>
        </>
    ) : <p>No countries found</p>;
}

export default CountryList