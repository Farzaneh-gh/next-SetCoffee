"use client";

import { useEffect } from 'react';
 import "aos/dist/aos.css";
 import Aos from 'aos';
function AosInit(){
    useEffect(() => {
       
       Aos.init()
      }, []);
    return(
      null
    )
};


export default AosInit