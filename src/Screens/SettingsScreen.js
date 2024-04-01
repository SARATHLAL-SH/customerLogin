import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const signoutHandler = async () => {
    // await AsyncStorage.removeItem('token');
    await AsyncStorage.setItem('token', null);
  };
  return (
    <View>
      <Text>SettingsScreen</Text>
      <TouchableOpacity onPress={signoutHandler}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
