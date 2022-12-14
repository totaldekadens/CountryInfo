import { FC, useContext } from "react"
import { flex, flexCenter, flexColumn } from "../../../style/common"
import { CountryContext } from "../../context/countryProvider"
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Comments from "../../interaction/comments";
import { CommentsByCountryContext } from "../../context/commentsByCountryProvider";
import { colors } from "../../../data/colors";
import { useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const CountrySingle: FC = () => {

    // Context
    const {country, setCountry} = useContext(CountryContext)
    const {comments, setComments} = useContext(CommentsByCountryContext)

    // State
    const [value, setValue] = React.useState('1');

    // Theme mediaquery
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md")); // if less than 900px match = true
    const isSmMatch = useMediaQuery(theme.breakpoints.down("sm"));

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleBack = () => {
        setCountry([])
    }


    return Object.keys(country).length > 0 ? (
        <div style={{...flex, marginTop: isMatch ? "0px": "32px"}}>
            <div style={{...flexColumn, paddingLeft: "50px", width:"550px", borderLeft: "1px solid gray" }}>
                {isMatch ? <Link to="/country" style={{textDecoration: "none"}}> <div style={{...flex, alignItems: "center", columnGap: "5px", color: `black` }}><KeyboardBackspaceIcon/><div onClick={handleBack} >Back</div></div></Link> : ""}
                <h1 style={{color: `${colors.primary}`}}>{country.name.common}</h1>
                <div style={{marginBottom:"5px"}}><img style={{height:"15vh"}} src={country.flags.png} alt="" /></div>  
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Info" value="1" />
                            <Tab label={`Comments (${comments.length})`} value="2" />
                        </TabList>
                        </Box>
                        <TabPanel sx={{display: "flex"}} value="1">
                            <div style={{...flexColumn, rowGap: "5px"}}>
                                <div>
                                    <strong>Capital: </strong><span>{country.capital ? country.capital[0] : "No capital"}</span>
                                </div>
                                <div>
                                    <strong>Continent: </strong><span>{country.continents ? country.continents[0] : "-"}</span>
                                </div>
                                <div>
                                    <strong>Subregion: </strong><span>{country.subregion ? country.subregion : "-"}</span>
                                </div>
                                <div>
                                    <strong>Population: </strong><span>{country.population ? country.population : "-"}</span>
                                </div>
                                <div>
                                    <strong>Currency: </strong>
                                    {country.currencies ? 
                                        <ul>
                                            <li>{Object.entries(country.currencies)[0][0]}</li>
                                        </ul>
                                    :   
                                        <span>-</span>}
                                </div>
                                <div>
                                    <strong>Languages: </strong>
                                    <ul>
                                        { country.languages ? Object.entries(country.languages).map(([key, value]) => {

                                            const myValue: string = value as string

                                            return <li key={myValue}>{myValue}</li> 
                                            })  

                                            : <p>-</p>
                                        }   
                                        
                                    </ul>
                                </div>
                                
                                {isSmMatch ? 
                                <div>
                                    {/* Embedded Googlemaps */} 
                                    {country.capitalInfo.latlng ? <iframe src={`https://maps.google.com/maps?q=${country.capitalInfo.latlng[0]},${country.capitalInfo.latlng[1]}&t=&z=15&ie=UTF8&iwloc=&output=embed`} width="200px" /> : ""}
                                </div> : ""
                                }   
                            </div>
                            {!isSmMatch ? 
                            <div>
                                {/* Embedded Googlemaps */} 
                                {country.capitalInfo.latlng ? <iframe src={`https://maps.google.com/maps?q=${country.capitalInfo.latlng[0]},${country.capitalInfo.latlng[1]}&t=&z=15&ie=UTF8&iwloc=&output=embed`} width="200px" /> : ""}
                            </div> : ""
                            }
                            
                        </TabPanel>
                        <TabPanel sx={{paddingTop: "0px", marginTop: "0px"}} value="2">
                            <Comments />
                        </TabPanel>
                    </TabContext>
                </Box>          
                
            </div>
        </div>
        
    ) : <p></p> // Maybe set a pic of the chosen region before a country get clicked on
}

export default CountrySingle