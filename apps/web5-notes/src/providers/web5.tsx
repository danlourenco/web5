import React, { createContext, Fragment, useState, useEffect } from 'react';
import { Web5 } from "@tbd54566975/web5";

export const Web5Context = createContext(null);

 const Web5Provider = ({ children }) => {
    // TODO: type web5 class instance appropriately
    const [web5, setWeb5] = useState<unknown>(null); 
    const [did, setDid] = useState<string | null>(null); 

    useEffect(() => {
      async function web5Connect() {
        const {web5, did} = await Web5.connect();
        setWeb5(web5);
        setDid(did);
      }
      web5Connect();
    }, []);

    return (
      <Web5Context.Provider value={{ web5, did }}>
        {children}
      </Web5Context.Provider>
    )
}

export default Web5Provider;