import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import { flex } from '../../style/common';
import { v4 as uuid } from 'uuid';

const CommentForm: FC = () => {

    const [name, setName] = useState<string>()
    const [city, setCity] = useState<string>()
    const [comment, setComment] = useState<string>()

    const todayDate = new Date().toISOString().slice(0, 10);
    
    const unique_id = uuid();
    const id = unique_id.slice(0,8)

    // Fortsätt på denna ej klar. // Lägg till kommentar 
    const handleClick = async () => {

        const object = {
            id: id,
            name: name,
            city: city,
            comment: comment,
            date: todayDate
        }

        const body = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object)
        };

        try {
            let response = await fetch('http://localhost:4000/api/notes', body)
            let result = await response.json();
    
            console.log(result)
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