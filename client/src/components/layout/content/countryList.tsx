import { FC, useContext } from "react"
import { RegionContext } from "../../context/regionProvider"
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { CountryContext } from "../../context/countryProvider";



const CountryList: FC = () => {

    // Context
    const {region} = useContext(RegionContext)
    const {setCountry} = useContext(CountryContext)

    // Sets value (the object of the chosen country) to country. Will be shown in "CountrySingle"
    const handleClick = (chosenCountry: any) => {
        setCountry(chosenCountry)
    }

    return region.length >= 1 ? (
        <div>
            <h1 style={{ paddingLeft: '20px', fontSize: "50px", color: "#063960"}}>{region[0].region == region[1]?.region ? region[0].region : "Search result: " }</h1> {/* Not the best solution, check */}
            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: "70vh", overflowY: "scroll"}}>
            
            {region.map((value: any) => {
                return (
                <ListItem
                    key={value.name.common}
                    disablePadding
                    onClick={() => {handleClick(value)}}
                >
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar
                            alt={`${value.flags.png}`}
                            src={`${value.flags.png}`}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={`${value.name.common}`} />
                    </ListItemButton>
                </ListItem>
                ); 
            })}
            </List>
        </div>
    ) : <p>No countries found</p>;
}

export default CountryList