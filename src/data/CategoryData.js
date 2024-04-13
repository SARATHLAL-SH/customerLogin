import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {API} from '../utils/apiutils';
import axios from 'axios';

const CategoryData = () => {
  const [categoryData, setCategoryData] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API + 'get-all-categories');
        if (response) {
          setCategoryData(response.data);
        } else {
          console.log('Category Data not available');
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  return {categoryData, error};
};

export default CategoryData;
