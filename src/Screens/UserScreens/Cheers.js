import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';

const Cheers = () => {
  const Navigation = useNavigation();
  const [animatedVideo, setAnimatedVideo] = useState(
    'https://giphy.com/embed/GrRo9NXCMna9jr2Obs/video',
  );
  setTimeout(() => {
    Navigation.navigate('My Home');
  }, 5000);
  return (
    <View style={styles.container}>
      <WebView source={{uri: animatedVideo}} style={styles.webview} />
    </View>
  );
};

export default Cheers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    width: Dimensions.get('window').width, // Set width to full screen width
    height: Dimensions.get('window').height, // Set height to full screen height
  },
});
