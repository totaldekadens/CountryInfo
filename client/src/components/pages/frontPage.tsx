import { CSSProperties, FC } from "react"
import { flexColumn } from "../../style/common"
import SearchEngine from "../interaction/search"
import { image2 } from "../../data/data"
import { useMediaQuery, useTheme } from "@mui/material"

const FrontPage: FC = () => {

    // Theme mediaquery
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div style={{ ...flexColumn, ...container, position: "relative" }}>
            <SearchEngine
                heightButton={"50px"}
                heightInput={"20px"}
                widthInput={isMatch ? "200px" : "300px"}
            />
            <img
                src={image2}
                width="100%"
                alt="world map"
                style={{ minHeight: "100vh", maxHeight: "100vh", objectFit: "cover" }}
            />
        </div>
    )
}

const container: CSSProperties = {
    margin: "0px",
    minHeight: "100vh",
    alignItems: "center",
}

export default FrontPage