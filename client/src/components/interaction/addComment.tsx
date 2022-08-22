import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC, useContext, useEffect, useState } from 'react';
import { CountryContext } from '../context/countryProvider';
import { addComment, getAllCommentsByCountry } from '../../helpers/fetchHelper';
import validateForm from '../../validation/validateForm';
import { CommentsByCountryContext } from '../context/commentsByCountryProvider';
import { AddComment, Comment, defaultComment, defaultError } from '../../data';
import CommentForm from './form';

const AddCommentComp: FC = () => {

    // Context
    const {country} = useContext(CountryContext)
    const {setComments} = useContext(CommentsByCountryContext)

    // States
    const [error, setError] = useState(defaultError)
    const [state, setState] = useState<Comment>(defaultComment)

    // If you got an error on any input and then move on to another country, the values will go to default.
    useEffect(() => {
        if(country) {
            setError(defaultError)
            setState(defaultComment)
        }
    }, [country])

    // Creates new comment
    const handleClick = async (event: { preventDefault: () => void }) => {

        event.preventDefault()

        const newComment: AddComment = {
            name: state.name,
            city: state.city,
            comment: state.comment,
            country: country.name.common
        }

        // Validation
        const checkErrors = validateForm(newComment)

        if(Object.keys(checkErrors).length > 0) {
            setError(checkErrors)
            return
        }

        try {
            // Send the new comment to DB
            let result = await addComment(newComment)
    
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

    return (
        <Accordion sx={{padding: "0px"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Add comment</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <CommentForm isUpdate={false} handleClick={handleClick} state={state} setState={setState} error={error}/>
            </AccordionDetails>
        </Accordion>
    );
}

export default AddCommentComp