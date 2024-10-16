import { useEffect, useState } from 'react'

function getLocal(key,value){

    if(!value){
        const savedvalue = JSON.parse(localStorage.getItem(key));
        if(savedvalue){
            return savedvalue;
        }
        return {};
    } 

    return value;
}

function useLocalStorage(props) {

    const [value, setValue] = useState(()=>{
        return getLocal(props.key,props.value);
    });

    useEffect(()=>{
        localStorage.setItem(props.key,JSON.stringify(value));
    },[value]);

  return {value,setValue};
}

export default useLocalStorage