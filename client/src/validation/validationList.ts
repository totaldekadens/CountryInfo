interface Validation {
    name: string,
    required: boolean
    minLenght: number
    maxLength: number
}

const validationList : Validation[]  = [
    {
        name: "name",
        required: true,
        minLenght: 2,
        maxLength: 20,
    },
    {
        name: "city",
        required: true,
        minLenght: 2,
        maxLength: 20,
    },
    {
        name: "comment",
        required: true,
        minLenght: 6,
        maxLength: 200,
    }
]

export default validationList
