
import AsyncStorage from '@react-native-async-storage/async-storage';

// export const storeToken = async (token) => {
//   try {
//     await AsyncStorage.setItem('token', token);
//   } catch (error) {
//     console.error('Error storing token:', error);
//   }
// };

export const fetchToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
  };

