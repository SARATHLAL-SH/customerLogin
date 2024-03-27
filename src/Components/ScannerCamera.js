import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {
  Camera,
  getCameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';

import {colors} from '../Globals/Styles';
import {recognizeText} from '../utils/functionutils/TextReadingUtils';
import {VerifyPancardHandler} from '../utils/functionutils/PancarduploadUtils';
import axios from 'axios';
import { API } from '../utils/apiutils';

const ScannerCamera = () => {
  const devices = useCameraDevices();
  const camera = useRef(null);
  const device = getCameraDevice(devices, 'back');
  const [image, setImage] = useState();
  const [text, setText] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [age, setAge] = useState();
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    recognizeText(image, setText, setMessage, setError);
  }, [image]);
  // handler
  useEffect(() => {
    requestCameraPermission();
  }, []);
  const requestCameraPermission = async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') await Linking.openSettings();
  };
  const takePicture = async () => {
    // if (camera != null) {
    //   setLoading(true);
    //   const photo = await camera.current.takePhoto();
    //   setImage('file://' + photo.path);
    //   setLoading(false);
    // }
    setLoading(true);
    if (camera != null) {
      try {
        const photo = await camera?.current?.takePhoto();
        if (photo) {
          const formData = new FormData();
          formData.append('file', {
            uri: 'file://' + photo.path, // Corrected URI
            type: 'image/jpeg',
            name: 'photo.jpg',
          });

          setImage('file://' + photo.path);

          const response = await axios.post(API + 'upload/pan', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          console.log(response.data);
          // Handle successful response if needed
        } else {
          setMessage('No photo captured');
        }
      } catch (error) {
        console.error(error);
        if (error.response) {
          console.error('Backend Error:', error.response.data.error);
          // Handle backend error
          setError(error.response.data.error);
        } else if (error.request) {
          console.error('Request Error:', error.request);
          // Handle request error
          setError('Request error occurred');
        } else {
          console.error('Unknown Error:', error.message);
          // Handle other errors
          setError('Unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    } else {
      setMessage('Please wait...');
    }
  };

 
  const renderCamera = () => {
    if (!device) {
      return (
        <View style={{backgroundColor: 'red'}}>
          <Text>Camera not opening</Text>
        </View>
      );
    } else {
      return (
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Camera
            style={{width: '90%', height: 200}}
            device={device}
            isActive={true}
            enableZoomGesture
            ref={camera}
            photo
          />
        </View>
      );
    }
  };
  console.log(text);
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.headerContainer}>
          <Text style={{marginTop: 10}}>Step 2/3</Text>
          <Text style={{marginTop: 10, fontWeight: '700'}}>
            Ensure your ID card photo is clear and ID's are readable
          </Text>

          <Text style={{marginTop: 10, fontWeight: '700'}}>
            TAKE PHOTO OF PANCARD
          </Text>
        </View>
        <View style={{}}>
          {image ? (
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Image
                source={{uri: image}}
                style={{width: '90%', height: 200}}
              />
            </View>
          ) : (
            renderCamera()
          )}
          {!image && (
            <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
              <Text
                style={{fontWeight: 700, fontSize: 20, color: colors.white}}>
                Capture PanCard
              </Text>
            </TouchableOpacity>
          )}
           {loading && (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={colors.buttons} />
            <Text>uploading . . . </Text>
          </View>
        )}
        </View>
        {image && (
          <View>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => {
                VerifyPancardHandler(text, setMessage, setError, setAge);
              }}>
              <Text style={styles.btnTxt}>Conform</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnContainer, {backgroundColor: colors.orange}]}
              onPress={() => {
                setImage('');
              }}>
              <Text style={styles.btnTxt}>Reset</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{message}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ScannerCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureBtn: {
    backgroundColor: 'green',
    width: '70%',
    bottom: 50,
    alignSelf: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: '99%',
    backgroundColor: colors.buttons,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  btnTxt: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.error,
    fontWeight: '700',
    fontSize: 18,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    color: colors.buttons,
    fontWeight: '700',
  },
});
