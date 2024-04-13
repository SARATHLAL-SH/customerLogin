import {View, Text} from 'react-native';
import React, {createContext, useState} from 'react';

const LoginContext = createContext();
export const LoginBtnContext = ({children}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isAdhaar, setIsAdhaar] = useState(false);
  const [isPanCard, setIsPanCard] = useState(false);
  const [loginToken, setLoginToken] = useState('');
  const [getUserData, setGetUserData] = useState();
  const[status,setStatus] = useState();
  return (
    <LoginContext.Provider
      value={{
        mobileNumber,
        setMobileNumber,
        isAdhaar,
        setIsAdhaar,
        isPanCard,
        setIsPanCard,
        loginToken,
        setLoginToken,
        getUserData,
        setGetUserData,
        status,setStatus
      }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
