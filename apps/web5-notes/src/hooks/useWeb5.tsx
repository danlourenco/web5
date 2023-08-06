import { useState, useEffect } from 'react';
import { Web5 } from "@tbd54566975/web5";

export default function useWeb5() {
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

  return { web5, did };
}