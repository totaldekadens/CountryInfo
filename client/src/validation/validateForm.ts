import { AddComment } from '../helpers/fetchHelper'
import validationList from './validationList'

const validateForm = (comment: AddComment) => {
    
    const errors: AddComment | any =  {}  // Fix type later
    
    Object.entries(comment).forEach(([key, value]) => {
        
        validationList.forEach((item) => {

            if(item.name == key) {

                // Required
                if(item.required && value == "") {
                    errors[key] = 'Required';
                }

                if(value != "") {

                    // Min length
                    if(value.length < item.minLenght) {
                        errors[key] = `Minimum length is ${item.minLenght} characters`;
                    }

                    // Max length
                    if(value.length > item.maxLength) {
                        errors[key] = `Max length is ${item.maxLength} characters`;
                    }
                }
            }
        })
    });

    return errors;
} 

export default validateForm