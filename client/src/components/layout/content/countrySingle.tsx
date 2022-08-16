import { FC, useContext } from "react"
import { flex, flexCenter, flexColumn } from "../../../style/common"
import { CountryContext } from "../../context/countryProvider"

const CountrySingle: FC = () => {

    // Context
    const {country} = useContext(CountryContext)

    return Object.keys(country).length > 0 ? (
        <div style={{...flex, justifyContent: "flex-end", marginTop: "32px"}}>
            <div style={{...flexColumn, paddingLeft: "50px", width:"400px"}}>
                <h1 style={{color: "#063970"}}>{country.name.common}</h1>
                <div style={{marginBottom:"5px"}}><img src={country.flags.png} alt="" /></div>            
                <div style={{...flexColumn, rowGap: "5px"}}>
                    <div>
                        <strong>Capital: </strong><span>{country.capital[0]}</span>
                    </div>
                    <div>
                        <strong>Continent: </strong><span>{country.continents[0]}</span>
                    </div>
                    <div>
                        <strong>Subregion: </strong><span>{country.subregion}</span>
                    </div>
                    <div>
                        <strong>Population: </strong><span>{country.population}</span>
                    </div>
                    <div>
                        <strong>Currency: </strong>
                        <ul>
                            <li>{Object.entries(country.currencies)[0][0]}</li>
                        </ul>
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
                </div>
                {/* Embedded Googlemaps */}
                <iframe src={`https://maps.google.com/maps?q=${country.capitalInfo.latlng[0]},${country.capitalInfo.latlng[1]}&t=&z=15&ie=UTF8&iwloc=&output=embed`} width="200px" />
            </div>
        </div>
        
    ) : <p></p>
}

export default CountrySingle