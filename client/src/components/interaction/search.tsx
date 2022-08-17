import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FC, useState, useContext } from 'react';
import { RegionContext } from '../context/regionProvider';
import { Link as RouterLink } from "react-router-dom";

const SearchEngine: FC = () => {
    
    // Context
    const {setRegion} = useContext(RegionContext)

    // State
    const [searchValue, setSearchValue] = useState("")

    // If value matches with a country in the api it will show up as a result
    const handleClick = async () => {
        try {

            let response = await fetch(`http://localhost:4000/api/external/country/${searchValue}`)
            let result = await response.json();

            if(result) {
                setRegion(result)
            }
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                id="standard-search"
                label="Search country.."
                type="search"
                variant="standard"
                onChange={(event) => {setSearchValue(event.target.value)}} 
                value={searchValue}
                />
            </div>
            {/* Todo: Add an event instead with keypress - enter? */}
            <Button 
                onClick={handleClick}
                component={RouterLink} to={`/search/${searchValue}`}
            >
                Search
            </Button>
        </Box>
    );
}

export default SearchEngine