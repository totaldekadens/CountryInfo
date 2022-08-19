import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FC, useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { flex } from '../../style/common';
import { CountryContext } from '../context/countryProvider';
import { addComment, getAllCommentsByCountry } from '../../helpers/fetchHelper';
import validateForm from '../../validation/validateForm';
import { CommentsByCountryContext } from '../context/commentsByCountryProvider';

const CommentForm: FC = () => {

    // Context
    const {country} = useContext(CountryContext)
    const {comments, setComments} = useContext(CommentsByCountryContext)

    // States
    const [name, setName] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [comment, setComment] = useState<string>("")
    const [error, setError] = useState({name: "", city: "", comment: ""})

    // If you got an error on any input and then move on to another country, the values will go to default.
    useEffect(() => {
        if(country) {
            setError({name: "", city: "", comment: ""})
            setName("")
            setCity("")
            setComment("")
        }
    }, [country])


    // Creates new comment
    const handleClick = async () => {

        const newComment = {
            name: name,
            city: city,
            comment: comment,
            country: country.name.common
        }

        // Validation
        const checkErrors = validateForm(newComment)

        if(Object.keys(checkErrors).length > 0) {
            setError(checkErrors)
            return
        }

        try {
            
            let result = await addComment(newComment)
    
            if(result) {
                setName("")
                setCity("")
                setComment("")
                setError({name: "", city: "", comment: ""})

                // Fetches and Updates context with current comments on country
                let updateComments = await getAllCommentsByCountry(country.name.common)

                    if(updateComments) {
                        setComments(updateComments)
                    }
                // To do : Lägg till feedback och se till att kommentarerna uppdaterar sig med en gång
            }

        } catch(err) {
            console.error(err)
        }
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="standard-basic"
                label="Name"
                variant="standard"
                onChange={(event) => { setName(event.target.value) }}
                value={name} 
                required
                autoFocus
                error= {error?.name ? true : false}
                helperText= {error?.name ? error.name : ""}
            />
            <TextField
                id="standard-basic"
                label="City"
                variant="standard"
                onChange={(event) => { setCity(event.target.value) }}
                value={city}
                required
                error= {error?.city ? true : false}
                helperText= {error?.city ? error.city : ""}
            />
            <TextField
                id="standard-multiline-static"
                label="Comment"
                multiline
                rows={4}
                variant="standard"
                onChange={(event) => { setComment(event.target.value) }}
                value={comment}
                required
                error= {error?.comment ? true : false}
                helperText= {error?.comment ? error.comment : ""}
            />
            <div style={{...flex, justifyContent: "flex-end", marginTop: "10px"}}>
                <Button onClick={handleClick} variant="contained">Add comment</Button>
            </div>
            
        </Box>
    );
}

export default CommentForm