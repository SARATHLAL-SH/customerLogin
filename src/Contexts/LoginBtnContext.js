import { View, Text } from 'react-native'
import React,{createContext,useState} from 'react'

const LoginContext = createContext();
export const LoginBtnContext = ({children}) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [isAdhaar,setIsAdhaar] = useState(false);
    const [isPanCard,setIsPanCard] = useState(false);
   

  return (
   <LoginContext.Provider value={{mobileNumber, setMobileNumber,isAdhaar,setIsAdhaar,isPanCard,setIsPanCard}}>{children}</LoginContext.Provider>
  )
}

export default LoginContext