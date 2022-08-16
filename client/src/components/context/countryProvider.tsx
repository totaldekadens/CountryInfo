import React, { createContext, FC, PropsWithChildren, useState } from "react";

interface CountryContextData {
    country:  any  
    setCountry: React.Dispatch<React.SetStateAction<any>>
}

export const CountryContext = createContext<CountryContextData>({
    country: [],
    setCountry: () => {}
})

export const CountryProvider: FC<PropsWithChildren> = (props) => {
    const [country, setCountry] = useState<any>([]);
    
    return (
        <CountryContext.Provider value={{country, setCountry}}>
            {props.children}
        </CountryContext.Provider>
    );
};