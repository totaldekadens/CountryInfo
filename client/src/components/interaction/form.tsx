import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FC } from 'react';
import Button from '@mui/material/Button';
import { flex, flexCenter } from '../../style/common';
import { Comment, handleInput } from '../../data';

interface Props {
    handleClick:  (event: {
        preventDefault: () => void;
    }) => Promise<void>
    isUpdate: boolean
    state: Comment
    setState: React.Dispatch<React.SetStateAction<Comment>>
    error: any
}

const CommentForm: FC<Props> = (props) => {

    // Gets back an updated list with current states and errors for each input we want to create and also necessary info for each input. 
    const HandleList = handleInput(props.state, props.error)

    return (
        <>
        {props.isUpdate ?
            <div style={flexCenter}>
                <h3>Edit comment</h3>
            </div> : ""}
        
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                {HandleList ? 
                    HandleList.map((item) => {
                        return(
                            <TextField
                                key={item.title}
                                id="standard-basic"
                                label={item.title}
                                variant="standard"
                                onChange={(event) => { props.setState(currentState => ({ ...currentState, [item.name]: event.target.value }))}}
                                value={item.state} 
                                required
                                error= {item.error ? true : false}
                                helperText= {item.error ? item.error : ""}
                            />
                        )
                    })
                    
                : ""}
                <div style={{...flex, justifyContent: "flex-end", marginTop: "10px"}}>
                    <Button onClick={props.handleClick} variant="contained">{ props.isUpdate ? "Update comment" : "Add comment"}</Button>
                </div>
            </Box>
        </>
    );
}

export default CommentForm