import { FC, useContext } from "react"
import { useParams } from "react-router-dom"
import { flex, flexCenter, flexColumn } from "../../style/common"
import { RegionContext } from "../context/regionProvider"
import SearchEngine from "../interaction/search"
import CountryList from "../layout/content/countryList"
import CountrySingle from "../layout/content/countrySingle"
import LinearProgress from '@mui/material/LinearProgress';
import Box from "@mui/material/Box"

interface Props {
    search?: string
}

const CountryPage: FC<Props> = (props) => {

    // Context
    const { region } = useContext(RegionContext)

    // Gets the search value from url
    const { value } = useParams();

    return region.length > 0 ? (
        <>
            <div style={{ ...flex, width: "100vw", justifyContent: "center", margin: "100px 0px 10px 0px" }}>
                <h1 style={{ paddingLeft: '20px', fontSize: props.search ? "20px" : "50px", color: "#063960" }}>
                    {props.search ? props.search + "'" + value + "'" : region[0].region}
                </h1>
            </div>
            <div style={{ ...flex, width: "100%", justifyContent: "center" }}>
                <CountryList />
                <CountrySingle />
            </div>
        </>
    ) : (
        <>
            <div style={{ ...flexCenter, ...flexColumn, 
                width: "100vw", 
                margin: "100px 0px 10px 0px", 
                }}
            >
                {props.search ?
                    <>
                        <h1 style={{ paddingLeft: '20px', fontSize: props.search ? "20px" : "50px", color: "#063960" }}>
                            {props.search + "'" + value + "'"}
                        </h1>
                        <div style={{ ...flex, width: "100%", justifyContent: "center" }}>
                            No countries found
                        </div>
                        <SearchEngine heightButton={"50px"} heightInput={"20px"} widthInput={"300px"}/>
                    </>
                    :
                    <Box sx={{ width: '50%', marginTop: "50px" }}>
                        <LinearProgress />
                    </Box>
                }
            </div>
        </>
    )
}

export default CountryPage