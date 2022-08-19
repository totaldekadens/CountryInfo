import React, { createContext, FC, PropsWithChildren, useState } from "react";

interface Comment {
    "id": number | string,
    "country": string
    "city": string
    "name": string
    "comment": string
    "date": string
}

interface CommentsByCountryContextData {
    comments:  any  
    setComments: React.Dispatch<React.SetStateAction<[] | Comment[]>>
}

export const CommentsByCountryContext = createContext<CommentsByCountryContextData>({
    comments: [],
    setComments: () => {}
})

export const CommentsByCountryProvider: FC<PropsWithChildren> = (props) => {
    const [comments, setComments] = useState<Comment[] | []>([]);
    
    return (
        <CommentsByCountryContext.Provider value={{comments, setComments}}>
            {props.children}
        </CommentsByCountryContext.Provider>
    );
};