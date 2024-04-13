import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {
  Camera,
  getCameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';
import axios from 'axios';
import {colors} from '../../Globals/Styles';
import {API} from '../../utils/apiutils';
import {useNavigation} from '@react-navigation/native';

const SelfieScreen = () => {
  const devices = useCameraDevices();
  const camera = useRef(null);
  const device = getCameraDevice(devices, 'front');
  const [image, setImage] = useState();
  const[images,setImages] = useState("");
  const [text, setText] = useState();
  const [message, setMessage] = useState();
  const [faces, setFaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {}, [image]);
  // handler
  useEffect(() => {
    requestCameraPermission();
  }, []);
  const clearMessage = () => {
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const requestCameraPermission = async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') {
      setMessage(
        'Camera access denied. Please grant camera access in your device settings.',
      );
      clearMessage();
      await Linking.openSettings();
    }
  };
  const takePicture = async () => {
    try{
      if (camera != null) {
        const photo = await camera.current.takePhoto();
        setImage('file://' + photo.path);
       
       const imageparts = photo.path.split('/')
       const imageName = imageparts[imageparts.length - 1];
       
          const formData = new FormData();
          formData.append('file', {
            uri: 'file://' + photo.path, // Corrected URI
            type: 'image/jpeg',
            name: 'photo.jpg',
          });
  
          const response = await axios.post(API + 'upload-selfie', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if (response) {
            // navigation.navigate('Homes');
            console.log("response after updeate",response.data.filename)
            setImages(response.data.filename)
          } else {
            setMessage('Network Error');
          }
       

      } else {
        setMessage('Image not Available');
        clearMessage();
      }
    } catch(error){
      console.log(error)
      if (error.response) {
        console.error('Backend Error:', error.response.data.error);
        // Handle backend error
        setMessage(error.response.data.error);
        clearMessage();
      } else if (error.request) {
        console.error('Request Error from Conform Handler:', error.request);
        // Handle request error
        setMessage('please wait some times..');
        clearMessage();
      } else {
        console.error('Unknown Error:', error.message);
        // Handle other errors
        setMessage('Check your internet connectivity');
        clearMessage();
      }
    } finally {
      setLoading(false);
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
            style={{width: '90%', height: 380}}
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

  const ConformHandler = async () => {
    setLoading(true);
    try {
      console.log("imagesss path",images)
      if (images) {
      const   formData ={"images":image}
      const response = await axios.post(API + 'create-selfie', {...formData});
        if (response) {
          
          navigation.navigate('Homes');
        } else {
          setMessage('Network Error');
        }
      } else {
        const formData = new FormData();
        formData.append('images', []);  
        setMessage('No photo captured');
        clearMessage();
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error('Backend Error:', error.response.data.error);
        // Handle backend error
        setMessage(error.response.data.error);
        clearMessage();
      } else if (error.request) {
        console.error('Request Error from Conform Handler:', error.request);
        // Handle request error
        setMessage('please wait some times..');
        clearMessage();
      } else {
        console.error('Unknown Error:', error.message);
        // Handle other errors
        setMessage('Check your internet connectivity');
        clearMessage();
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <Text style={{marginTop: 10}}>Step 3/3</Text>
        <Text style={{marginTop: 10, fontWeight: '700'}}>
          Ensure that your face is clear while uploading
        </Text>

        <Text style={{marginTop: 10, fontWeight: '700'}}>TAKE ONE SELFIE</Text>
      </View>

      {image ? (
        <View style={{alignItems: 'center', marginTop: 20, elevation: 10}}>
          <Image
            source={{uri: image}}
            style={{
              width: '65%',
              height: 300,
              borderRadius: 20,
              transform: [{rotate: '90deg'}],
            }}
          />
        </View>
      ) : (
        <>
          {renderCamera()}
          <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
            <Text style={{fontWeight: 700, fontSize: 20, color: colors.white}}>
              Take one Selfie
            </Text>
          </TouchableOpacity>
        </>
      )}

      {image && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={ConformHandler}>
            <Text style={styles.btnTxt}>Conform</Text>
          </TouchableOpacity>
          {loading && (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color={colors.buttons} />
              <Text>uploading . . . </Text>
            </View>
          )}
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
    </View>
  );
};

export default SelfieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureBtn: {
    backgroundColor: 'green',
    width: '70%',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: '98%',
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
