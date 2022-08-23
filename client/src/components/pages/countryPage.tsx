import { FC, useContext } from "react"
import { useParams } from "react-router-dom"
import { flex, flexCenter, flexColumn } from "../../style/common"
import { RegionContext } from "../context/regionProvider"
import SearchEngine from "../interaction/search"
import CountryList from "../layout/content/countryList"
import CountrySingle from "../layout/content/countrySingle"
import LinearProgress from '@mui/material/LinearProgress';
import Box from "@mui/material/Box"
import { CountryContext } from "../context/countryProvider"
import { colors } from "../../data/colors"
import { useMediaQuery, useTheme } from "@mui/material"

interface Props {
    search?: string
}

const CountryPage: FC<Props> = (props) => {

    // Context
    const { region } = useContext(RegionContext)
    const { country } = useContext(CountryContext)

    // Gets the search value from url
    const { valuePar } = useParams();

    // Theme mediaquery
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md")); // if less than 900px match = true
    const isSmMatch = useMediaQuery(theme.breakpoints.down("sm")); // if less than 600px match = true


    return region.length > 0 ? (
        <>
            <div style={{
                ...flex,
                width: "100vw",
                justifyContent: "center",
                margin: isSmMatch ? "70px 0px 10px 0px" : "100px 0px 10px 0px"
            }}
            >
                {Object.keys(country).length > 0 ? "" :
                    <h1 style={{
                        paddingLeft: '20px',
                        fontSize: props.search ? "20px" : "50px",
                        color: `${colors.primary}`
                    }}
                    >
                        {props.search ? props.search + "'" + valuePar + "'" : region[0].region}
                    </h1>
                }
            </div>
            {isMatch ?
                <div style={{ ...flex, width: "100%", justifyContent: "center" }}>
                    {Object.keys(country).length > 0 ?
                        <CountrySingle />
                        :
                        <CountryList />
                    }
                </div>
                :
                <div style={{ ...flex, width: "100%", justifyContent: "center" }}>
                    <CountryList />
                    <CountrySingle />
                </div>
            }
        </>
    ) : (
        <>
            <div style={{
                ...flexCenter, ...flexColumn,
                width: "100vw",
                margin: "100px 0px 10px 0px",
            }}
            >
                {props.search ?
                    <>
                        <h1 style={{
                            paddingLeft: '20px',
                            fontSize: props.search ? "20px" : "50px",
                            color: "#063960"
                        }}
                        >
                            {props.search + "'" + valuePar + "'"}
                        </h1>
                        <div style={{
                            ...flex,
                            width: "100%",
                            justifyContent: "center",
                            marginBottom: "50px"
                        }}
                        >
                            No countries found
                        </div>
                        <SearchEngine
                            heightButton={"40px"}
                            heightInput={"6px"}
                            widthInput={"200px"}
                            top={"-"}
                            type={"search"}
                        />
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