import {View, Text, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import LoginScreen from '../Screens/AuthScreen/LoginScreen';
import {colors} from '../Globals/Styles';
import {LoginBtnContext} from '../Contexts/LoginBtnContext';
import SignupScreen from '../Screens/AuthScreen/SignupScreen';
import VerifyScreen from '../Screens/AuthScreen/VerifyScreen';
import HomeVerification from '../Screens/VerificationScreen/HomeVerification';
import SelectIDScreen from '../Screens/VerificationScreen/SelectIDScreen';
import AdhaarCard from '../Components/AdhaarCard';
import DocumentUploader from '../Screens/VerificationScreen/DocumentUploader';
import {NavigationContainer} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScannerCamera from '../Components/ScannerCamera';
import SelfieScreen from '../Screens/SelfieScreen';

// const Stack = createStackNavigator();
export const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    
    <LoginBtnContext>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
<NavigationContainer >
  <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:colors.black},headerTitleStyle:{ fontSize:22, color:colors.buttons},headerTintColor:colors.buttons}} >
    <Stack.Screen name='login' component={LoginScreen}/>
    <Stack.Screen name='signup' component={SignupScreen}/>

    <Stack.Screen name='verifyScreen' component={VerifyScreen}/>
     <Stack.Screen name='homeScreen' component={HomeVerification}/>
     <Stack.Screen name='selectID' component={SelectIDScreen}/>
    <Stack.Screen name='Upload Aadhaar' component={DocumentUploader}/>
    <Stack.Screen name='Upload PanCard' component={ScannerCamera}/>
    <Stack.Screen name='Take Selfie' component={SelfieScreen}/>
      {/* <AdhaarCard/> */}
    
      {/* <ScannerCamera/> */}
      </Stack.Navigator>
      </NavigationContainer>
    </LoginBtnContext>
  );
};

export default Navigation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
