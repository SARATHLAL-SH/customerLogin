import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {
  Camera,
  getCameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';

import {colors} from '../Globals/Styles';
import {
  useFrameProcessor,
  FrameProcessorPriority,
  FaceDetector,
} from 'vision-camera-face-detector';

const SelfieScreen = () => {
  const devices = useCameraDevices();
  const camera = useRef(null);
  const device = getCameraDevice(devices, 'front');
  const [image, setImage] = useState();
  const [text, setText] = useState();
  const [message, setMessage] = useState();
  const [faces, setFaces] = useState([]);
  //   useFrameProcessor(
  //     async (frame) => {
  //       if (device && device.position === 'front') {
  //         try {
  //           const detectedFaces = await FaceDetector.findFaces(frame, {
  //             mode: FaceDetector.Mode.Fast, // Adjust mode if needed (Fast, Accurate)
  //             landmarkMode: FaceDetector.LandmarkMode.None, // Detect landmarks (optional)
  //             classifications: FaceDetector.Classifications.None, // Detect classifications (optional)
  //           });
  //           setFaces(detectedFaces);
  //         } catch (error) {
  //           console.error('Error detecting faces:', error);
  //           // Handle errors (e.g., display error message to user)
  //         }
  //       }
  //     },
  //     [device],
  //     FrameProcessorPriority?.FaceDetection
  //   );

  //   return faces;

  useEffect(() => {}, [image]);
  // handler
  useEffect(() => {
    requestCameraPermission();
  }, []);
  const requestCameraPermission = async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') await Linking.openSettings();
  };
  const takePicture = async () => {
    if (camera != null) {
      const photo = await camera.current.takePhoto();
      setImage('file://' + photo.path);
    }
  };

  console.log(image);
  const renderCamera = () => {
    if (!device) {
      return (
        <View style={{backgroundColor: 'red'}}>
          <Text>Camera not opening</Text>
        </View>
      );
    } else {
      return (
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Camera
            style={{width: '65%', height: '250'}}
            device={device}
            isActive={true}
            enableZoomGesture
            ref={camera}
            photo
          />
          <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
            <Text style={{fontWeight: 700, fontSize: 20, color: colors.white}}>
              Take one Selfie
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  console.log(text);
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
        <View style={{alignItems: 'center', marginTop: 25}}>
          <Image
            source={{uri: image}}
            style={{width: '65%', height: 300, borderRadius: 20}}
          />
        </View>
      ) : (
        renderCamera()
      )}

      {image && (
        <View>
          <TouchableOpacity style={styles.btnContainer} onPress={() => {}}>
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
