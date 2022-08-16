import React, { createContext, FC, PropsWithChildren, useState } from "react";

interface RegionContextData {
    region:  any  
    setRegion: React.Dispatch<React.SetStateAction<any>>
}

export const RegionContext = createContext<RegionContextData>({
    region: [],
    setRegion: () => {}
})

export const RegionProvider: FC<PropsWithChildren> = (props) => {
    const [region, setRegion] = useState<any>([]);
    
    return (
        <RegionContext.Provider value={{region, setRegion}}>
            {props.children}
        </RegionContext.Provider>
    );
};