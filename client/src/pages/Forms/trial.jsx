import React, { useState ,useContext} from 'react';
import  ContextFormSP101Data  from '../../Context/ContextFormSP101Data';


function trial() {

    const {formData} = useContext(ContextFormSP101Data);
        console.log(formData);
       if (formData === null) {

            return  <div>please { formData}enter data</div>

        }
        return <div>{ formData.budgetHead} </div>
    
}

export default trial;
