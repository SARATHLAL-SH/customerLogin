import React, {useEffect, useState} from 'react';
import {API} from '../utils/apiutils';
import axios from 'axios';
import LoginContext from '../Contexts/LoginBtnContext';
import {useContext} from 'react';

const GetUserByMobile = () => {
  const {mobileNumber, getUserData, setGetUserData} = useContext(LoginContext);

  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          API + 'get-register-user/' + mobileNumber,
        );
        if (response) {
          setGetUserData(response.data);
        } else {
          console.log('Category Data not available');
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [mobileNumber]);
  return {getUserData, error};
};

export default GetUserByMobile;
