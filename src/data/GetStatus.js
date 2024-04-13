import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { API } from '../utils/apiutils';

const useGetStatus = (mobileNumber) => {
    const [status, setStatus] = useState(null);

    useEffect(()=>{
        const getStatus = async()=>{
            try{
            const status = await  axios.get(API + 'get-mobile-status/'+ mobileNumber)
              if (status) {
                console.log("getStatus",status.data);
                setStatus(status?.data?.status)
              }
              else{
                setStatus(null);
                console.log("getStatus data not available");
              }
            }catch(error){
              console.log("error from getStatus", error)
            }
          
          } 
          getStatus();
    },[mobileNumber])
    
  return status
}

export default useGetStatus

