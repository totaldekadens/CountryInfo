import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FC, useState, useContext, CSSProperties } from 'react';
import { RegionContext } from '../context/regionProvider';
import { Link as RouterLink, Navigate } from "react-router-dom";
import { flexCenter } from '../../style/common';
import { CountryContext } from '../context/countryProvider';
import { getCountry } from '../../helpers/fetchHelper';

interface Props {
    heightButton: string
    heightInput: string
    widthInput: string
    top?: string
    type?: string
    tabValue?: React.Dispatch<React.SetStateAction<number | boolean>>
}


const SearchEngine: FC<Props> = (props) => {
    
    // Context
    const {setRegion} = useContext(RegionContext)
    const {setCountry} = useContext(CountryContext)

    // State
    const [searchValue, setSearchValue] = useState("")

    // If value matches with a country in the api it will show up as a result
    const handleClick = async () => {
        try {   
                // Removes focus from any region tab in navbar
                if(props.tabValue) {
                    props.tabValue(false);
                }
                
                // resets region so the search result will be clean
                setRegion([])

                if(searchValue.length < 1) {
                    return
                } 

                let result = await getCountry(searchValue);
            
                if(result && result.message != 404) {
                    setRegion(result)
                    setCountry([])
                    setSearchValue("")
                }
        }catch(err) {
            console.error(err)
        }
    }

    return (
        <div style={!props.type ? container : container2 }>
                <div style={{...flexCenter,  width: !props.type ? '450px' : '300px'}}>
                    <TextField
                    id="standard"
                    label="Search country.."
                    type="text"
                    variant="outlined"
                    onChange={(event) => {setSearchValue(event.target.value)}} 
                    value={searchValue}
                    sx={{
                        '& .MuiInputBase-root': {width: props.widthInput}, 
                        input:{...inputProperties, height: props.heightInput, boxShadow: !props.type ? "0px 0px 10px black" : "0px"}, 
                        '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {top: props.top ? "-8px" : "0px"}
                    }}
                    />
                <Button 
                    style={{boxShadow: !props.type ? "0px 0px 10px black" : "0px", marginLeft: "20px", height: props.heightButton, opacity: "0.8"}}
                    variant="contained"
                    onClick={handleClick}
                    component={RouterLink} to={ searchValue ? `/search/${searchValue}` : `/search/""`}
                >
                    Search
                </Button>
            </div>
            
        </div>
        
    );
}

const container : CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "30%",
    transform: "translate(-50%, -50%)"
}

const container2 : CSSProperties = {
display: "flex",
marginLeft: "20px"
}

const inputProperties : CSSProperties = {
    backgroundColor: "rgb(255,255,255, 0.7)", 
    color: "rgb(10,10,10)", 
    border: "2px solid lightgray", 
    boxShadow: "0px 0px 10px black", 
    borderRadius: "5px", 
    height: "20px"
}

export default SearchEngine