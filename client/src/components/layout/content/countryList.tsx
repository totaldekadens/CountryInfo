import { FC, useContext } from "react"
import { RegionContext } from "../../context/regionProvider"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { CountryContext } from "../../context/countryProvider";
import { useParams } from "react-router-dom";

interface Props {
    search?: string
}

const CountryList: FC<Props> = (props) => {
    
    // Gets the search value from url
    const { value } = useParams();

    // Context
    const {region} = useContext(RegionContext)
    const {setCountry} = useContext(CountryContext)

    // Sets value (the object of the chosen country) to country. Will be shown in "CountrySingle"
    const handleClick = (chosenCountry: any) => {
        setCountry(chosenCountry)
    }

    console.log(region)

    return region.length >= 1 ? (
        <div>
            <h1 style={{ paddingLeft: '20px', fontSize: props.search ? "20px" : "50px", color: "#063960"}}>
                { props.search ? props.search + "'" + value + "'" : region[0].region }
            </h1> 
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