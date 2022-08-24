import { CSSProperties, FC, useContext, useEffect, useState } from "react"
import { flex, flexColumn, flexRowBetween } from "../../style/common"
import { CountryContext } from "../context/countryProvider"
import Avatar from '@mui/joy/Avatar';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import { deleteComment, getAllCommentsByCountry, editComment } from "../../helpers/fetchHelper";
import { CommentsByCountryContext } from "../context/commentsByCountryProvider";
import Modal from '../modal/modal'
import { Comment, defaultComment, defaultError } from '../../data/data'
import validateForm from "../../validation/validateForm";
import CommentForm from "./form";
import AddCommentComp from "./addComment";
import { colors } from "../../data/colors";

const Comments: FC = () => {

    // Context
    const {country} = useContext(CountryContext)
    const {comments, setComments} = useContext(CommentsByCountryContext)
    
    // State
    const [localComments, setLocalComments] = useState<Comment[] | []>([])
    const [shouldShowModal, setShouldShowModal] = useState(false)
    const [error, setError] = useState(defaultError)
    const [state, setState] = useState<Comment>(defaultComment)
    
    // If localComments and comments are not equal, comments has been updated. 
    // Adds ++ to change and will get in to useeffect.
    let change = 0

    if(comments != localComments) {
        change++    
    }




    // Deletes comment and updates the comment field
    const handleDelete = async (id: string) => {
        
        // Todo: Fix a "Are you sure?" -alert
        const removeComment = await deleteComment(id)
        alert(removeComment) // Temporary

        let result = await getAllCommentsByCountry(country.name.common)
            if(result) {
                setComments(result)
            }
    }




    // Edits comment and updates the comment field when updated
    const handleEdit = async (event: { preventDefault: () => void }) => {

        event.preventDefault()

        // Validation. If someting's not correct typed into the input fields, 
        // the errors will return as an object and you will not proceed.  
        const checkErrors = validateForm(state)

        if(Object.keys(checkErrors).length > 0) {
            setError(checkErrors)
            return
        }

        try {
            // Updates DB with new info
            let result = await editComment(state)
            
            if(result) {
                alert(result) // temporary
                setState(defaultComment)
                setError(defaultError)

                // Fetches and Updates context with current comments on country
                let updateComments = await getAllCommentsByCountry(country.name.common)

                    if(updateComments) {
                        setComments(updateComments)
                    }
            }
        } catch(err) {
            console.error(err)
        }
    }




    // When edit icon get clicked, modal shows up with en edit form and state sets to the currently clicked comment
    const handleClick = (item: Comment) => {
        setShouldShowModal(!shouldShowModal)
        setState(item)
    }




    // if any comments-context or country-context changes we gets into this 
    // useeffect and gets updated list with comments on the current country.
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
            <AddCommentComp />
            {comments.length > 0 ? comments.map((item: Comment) => { 
                return (
                    <div key={item.id}>
                        <div style={container} >
                            <div style={{...flexRowBetween, justifyContent: "space-between", color:   "#404040"}}>
                                <div style={{...flex, alignItems: "center"}}>
                                    <Avatar />
                                    {item.name}
                                </div>
                                <span style={{fontSize: "12px", color: "grey", marginRight: "10px", width: "115px"}}>{item.date}</span>
                                <EditIcon style={{cursor: "pointer"}} onClick={() => {handleClick(item)}}/>
                                <HighlightOffIcon style={{cursor: "pointer"}} onClick={() => {handleDelete(item.id)}} sx={{color: "rgb(255,51,51,0.7)"}}/>
                            </div>
                            <div style={{...flexColumn, color: "#202020"}}>
                                <div>
                                    <strong style={{fontSize: "14px"}}>City: </strong><span>{item.city}</span>
                                </div>
                                <strong style={{fontSize: "14px"}}>Comment: </strong>
                                <span style={{fontSize: "14px"}}>{item.comment}</span>
                            </div>
                        </div>
                        <Modal shouldShow={shouldShowModal} onRequestClose={() => setShouldShowModal(false)} >
                            <CommentForm 
                            isUpdate={true} 
                            handleClick={handleEdit} 
                            error={error} 
                            state={state} 
                            setState={setState}/>
                        </Modal>
                    </div>)
            }) : <p>No comments</p>}
        </div>)
}

const container: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: `${colors.fifth}`,
    marginTop: "10px",
    borderRadius: "5px",
    padding: "5px",
    boxShadow: "0px 0px 10px grey"
}

export default Comments