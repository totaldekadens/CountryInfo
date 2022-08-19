import { CSSProperties, FC, useContext, useEffect, useRef, useState } from "react"
import { flex, flexCenter, flexColumn, flexRowBetween } from "../../style/common"
import { CountryContext } from "../context/countryProvider"
import Avatar from '@mui/joy/Avatar';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import SimpleAccordion from "./accordion";
import { deleteComment, getAllCommentsByCountry } from "../../helpers/fetchHelper";
import { CommentsByCountryContext } from "../context/commentsByCountryProvider";

interface Props {}

interface Comment {
        "id": string,
        "country": string
        "city": string
        "name": string
        "comment": string
        "date": string
}

const Comments: FC<Props> = (props) => {

    // Context
    const {country} = useContext(CountryContext)
    const {comments, setComments} = useContext(CommentsByCountryContext)

    // State
    const [localComments, setLocalComments] = useState<Comment[] | []>([])

    /* If localComments and comments are not equal, comments has been updated. 
    Adds ++ to change and will get in to useeffect. */
    let change = 0

    if(comments != localComments) {
        change++    
    }

    // Deletes comment and update the comment field
    const handleDelete = async (id: string) => {
        
        // Todo: Fix a "Are you sure?" -alert

        await deleteComment(id)

        let result = await getAllCommentsByCountry(country.name.common)

            if(result) {
                setComments(result)
            }
    }

    const handleEdit = (id: string) => {
        console.log("Edit function")
    }

    /* if any comments-context or country-context changes we gets into this 
    useeffect and gets updated list with comments on the current country.  */
    useEffect(() => {

        if(country) {

            const getComments = async() => {

                try {
                    let result = await getAllCommentsByCountry(country.name.common)

                    if(result) {
                        setComments(result)
                        setLocalComments(result)
                    }
                } catch(err) {
                    console.error(err)
                }
            }
            getComments();
        }
    }, [country, change]) 

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