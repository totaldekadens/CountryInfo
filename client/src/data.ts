import picture from './assets/world.png'
import picture2 from './assets/hands.jpg'

export const list = ["Africa","America", "Asia", "Europe", "Oceania"]

export const image = picture
export const image2 = picture2


export interface Comment {
    "id": string,
    "country": string
    "city": string
    "name": string
    "comment": string
    "date": string
}

export interface AddComment {
    "country": string
    "city": string
    "name": string
    "comment": string
}

export interface EditComment {
    "name": string
    "city": string
    "comment": string
}

export interface Error {
    "name": string
    "city": string
    "comment": string
}


export const defaultError = {
    name: "", 
    city: "", 
    comment: ""
}

export const defaultComment = {
    id: "",
    country: "",
    city: "", 
    name: "", 
    comment: "",
    date: ""
}

export interface Comment {
    "id": string,
    "country": string
    "city": string
    "name": string
    "comment": string
    "date": string
}


interface InputComment {
    name: string,
    title: string
    type: string
    state?: string
    error?: string
}

export const handleInput = (state: Comment, errors: any) => {

    const InputCommentList : InputComment[]  = [
        {
            name: "name",
            title: "Name",
            type: "text",
            state: state.name,
            error: errors.name,
        },
        {
            name: "city",
            title: "City",
            type: "text",
            state: state.city,
            error: errors.city
        },
        {
            name: "comment",
            title: "Comment",
            type: "text",
            state: state.comment,
            error: errors.comment
        }
    ]

    return InputCommentList
}