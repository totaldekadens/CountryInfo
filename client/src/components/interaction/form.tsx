import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FC, useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { flex } from '../../style/common';
import { CountryContext } from '../context/countryProvider';

const CommentForm: FC = () => {

    const {country} = useContext(CountryContext)

    const [name, setName] = useState<string>()
    const [city, setCity] = useState<string>()
    const [comment, setComment] = useState<string>()

    // Creates new comment
    const handleClick = async () => {

        const object = {
            name: name,
            city: city,
            comment: comment,
            country: country.name.common
        }

        const body = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object)
        };

        try {
            let response = await fetch('http://localhost:4000/api/notes', body)
            let result = await response.json();
    
            if(result) {
                setName("")
                setCity("")
                setComment("")
                // To do : Lägg till feedback och se till att kommentarerna uppdaterar sig med en gång
            } else {
                // To do: Feedback på varför det inte gick
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
            />
            <TextField
                id="standard-basic"
                label="City"
                variant="standard"
                onChange={(event) => { setCity(event.target.value) }}
                value={city}
            />
            <TextField
                id="standard-multiline-static"
                label="Comment"
                multiline
                rows={4}
                variant="standard"
                onChange={(event) => { setComment(event.target.value) }}
                value={comment}
            />
            <div style={{...flex, justifyContent: "flex-end", marginTop: "10px"}}>
                <Button onClick={handleClick} variant="contained">Add comment</Button>
            </div>
            
        </Box>
    );
}

export default CommentForm