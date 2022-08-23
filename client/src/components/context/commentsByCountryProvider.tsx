import React, { createContext, FC, PropsWithChildren, useState } from "react";
import { Comment } from '../../data/data'

interface CommentsByCountryContextData {
    comments:  Comment[] | [] 
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