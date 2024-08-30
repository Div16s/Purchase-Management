import React, {useState } from "react";
import  ContextFormSP101Data  from "./ContextFormSP101Data";


const ContextFormSP101DataProvider= ({children}) =>{
    const [formData, setFormData] = useState(null);
    return (
        <ContextFormSP101Data.Provider value= {{formData,setFormData}}>
            {children}
        </ContextFormSP101Data.Provider>
    )
}

export default ContextFormSP101DataProvider;