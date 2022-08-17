import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC } from 'react';
import CommentForm from './form';

const SimpleAccordion:FC = () => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Add comment</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <CommentForm/>
            </AccordionDetails>
        </Accordion>
    );
}

export default SimpleAccordion