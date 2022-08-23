import { Comment, AddComment } from '../data/data'

interface Body {
    method: string
    headers?: {}
    body?: string
}

const makeRequest = async (url : string, body?: Body ) => {
    try {
        let response = await fetch(url, body)
        let result = await response.json();

        return result
    } catch(err) {
        console.error(err)
    }
}




// GET All countries
export const getAllCountries = async () => {
    let result = await makeRequest('http://localhost:4000/api/external/all');
    return result;
}

// GET countries by region
export const getRegion = async (region : string) => {
    let result = await makeRequest(`http://localhost:4000/api/external/region/${region}`);

    // Fixa any!
    result.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common))
    
    return result;
}

// GET country
export const getCountry = async (country : string) => {
    let result = await makeRequest(`http://localhost:4000/api/external/country/${country}`);
    return result;
}






// GET All comments
export const getAllComments = async () => {
    let result = await makeRequest('http://localhost:4000/api/notes');
    return result;
}

// GET all comments by country
export const getAllCommentsByCountry = async (country: string) => {
    let result = await makeRequest(`http://localhost:4000/api/notes/country/${country}`);
    return result;
}

// GET comment by id
export const getComment = async (id : string | number) => {
    let result = await makeRequest(`http://localhost:4000/api/notes/${id}`);
    return result;
}


// DELETE comment by id
export const deleteComment = async (Id: number | string) => {
    const requestOptions = {
        method: 'DELETE',
    };

    let result = await makeRequest(`http://localhost:4000/api/notes/${Id}`, requestOptions) 

    return result;
}

// POST - Add comment
export const addComment = async (newComment : AddComment) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment)
    };

    let result = await makeRequest('http://localhost:4000/api/notes', requestOptions)

    return result;
}

// PUT - Edit comment
export const editComment = async (editedComment: Comment) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedComment)
    };

    let result = await makeRequest(`http://localhost:4000/api/notes`, requestOptions)

    return result
}