import { CSSProperties, FC, useContext, useEffect, useState } from "react"
import { flex, flexCenter, flexColumn, flexRowBetween } from "../../style/common"
import { CountryContext } from "../context/countryProvider"
import Avatar from '@mui/joy/Avatar';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import SimpleAccordion from "./accordion";

interface Props {}

interface Comment {
        "id": number | string,
        "country": string
        "city": string
        "name": string
        "comment": string
        "date": string
}

const Comments: FC<Props> = (props) => {

    // Context
    const {country} = useContext(CountryContext)

    // State
    const [comments, setComments] = useState<Comment[] | []>([])

    const handleDelete = (id: number|string) => {
        console.log("Delete function")
    }

    const handleEdit = (id: number|string) => {
        console.log("Edit function")
    }

    useEffect(() => {
        
        if(country) {

            setComments([])

            const getComments = async() => {
                try {
                    let response = await fetch(`http://localhost:4000/api/notes/country/${country.name.common}`)
                    let result = await response.json();
            
                    if(result) {
                        setComments(result)
                    }
                } catch(err) {
                    console.error(err)
                }
            }
            getComments();
        }
    }, [country])

    return (
        <div style={flexColumn}>
            <SimpleAccordion/>
            {comments.length > 0 ? comments.map((item: Comment) => { 
                return (
                    <div key={item.id} style={container} >
                        <div style={{...flexRowBetween, justifyContent: "space-between", color: "#404040"}}>
                            <div style={{...flex, alignItems: "center"}}>
                                <Avatar />
                                {item.name}
                            </div>
                            <span style={{fontSize: "12px", color: "grey", marginRight: "10px", width: "90px"}}>{item.date}</span>
                            <EditIcon onClick={() => {handleEdit(item.id)}}/>
                            <HighlightOffIcon onClick={() => {handleDelete(item.id)}} sx={{color: "rgb(255,51,51,0.7)"}}/>
                        </div>
                        <div style={{...flexColumn, color: "#202020"}}>
                            <div>
                                <strong>City: </strong><span>{item.city}</span>
                            </div>
                            <strong>Comment: </strong>
                            <span style={{fontSize: "12px"}}>{item.comment}</span>
                        </div>
                    </div>)
            }) : <p>No comments</p>}
        </div>)
}

const container: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "lightblue",
    marginTop: "10px",
    borderRadius: "5px",
    padding: "5px"
}

export default Comments