import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useContext, useState, useRef} from 'react';
import Header from '../../Components/Header';
import LoginContext from '../../Contexts/LoginBtnContext';
import smsLogo from '../../../Assets/Images/smartphonebg.png';
import axios from 'axios';
import {colors} from '../../Globals/Styles';
import {useNavigation} from '@react-navigation/native';
import { API } from '../../utils/apiutils';
// import OtpAutoFillViewManager from 'react-native-otp-auto-fill';

const VerifyScreen = () => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const {mobileNumber} = useContext(LoginContext);
  const [error, setError] = useState('');
  const [otps, setOtp] = useState({1: '', 2: '', 3: '', 4: ''});
  const [showResendOTP, setShowResendOTP] = useState(false);
  const Navigation = useNavigation();
  const otpLength = Object.values(otps).filter(value => value !== '').length;
  const resendOtpTextHandler = () => {
    const timer = setTimeout(() => {
      setShowResendOTP(!showResendOTP);
    }, 10000);

    return () => clearTimeout(timer);
  };
  const resenndOtpHanlder = async() => {

    try {
      const otpResponce = await axios.post(API + 'send-otp', {mobileNumber});
      Navigation.navigate('verifyScreen');
    } catch (error) {
      console.log('error', error);
    }
    setShowResendOTP('');
    setError('OTP successfully Resent to your Mobile Number');
    setTimeout(() => {
      setError('');
    }, 3000);
  };
  const siginButtonHandler = async() => {
    resendOtpTextHandler();
   
   
    try {
      const otp = Object.values(otps).join('');
      const otpResponce = await axios.post(API + 'verify-otp', {otp});
     
      Navigation.navigate('signup');
      setError('Successfully Logged In')
    } catch (error) {
      console.log('error', error);
      setError("Password mismatch")
    }
   
    setTimeout(() => {
      setError('');
    }, 3000);
  };
  const otperrorHandler = () => {
    setError('Fill Four Digit OTP');
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Header title="VERIFY DETAILS" type="arrow-left" /> */}
      <View style={styles.header}>
        <View>
          <Text style={styles.commontext}>VERIFY DETAILS</Text>
          <Text style={styles.subCommontext}>OTP sent to {mobileNumber} </Text>
        </View>
        <View>
          <Image
            source={smsLogo}
            style={{width: 150, height: 100, objectFit: 'cover'}}
          />
        </View>
      </View>
      <View style={styles.otpWraper}>
        <View style={styles.otpContainer}>
          <Text style={styles.otphead}>
            Enter the OTP number just sent you at +91 {mobileNumber}
          </Text>
        </View>
        <View style={styles.otpContainer}>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={firstInput}
              onChangeText={text => {
                setOtp({...otps, 1: text});
                text && secondInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={secondInput}
              onChangeText={text => {
                setOtp({...otps, 2: text});
                text ? thirdInput.current.focus() : firstInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={thirdInput}
              onChangeText={text => {
                setOtp({...otps, 3: text});
                text
                  ? fourthInput.current.focus()
                  : secondInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={fourthInput}
              onChangeText={text => {
                setOtp({...otps, 4: text});
                !text && thirdInput.current.focus();
              }}
            />
          </View>
        </View>
        {otpLength < 4 ? (
          <TouchableOpacity
            style={[styles.loginBtnContainer, {opacity: 0.5}]}
            onPress={otperrorHandler}>
            <Text style={[styles.btnText]}>ENTER OTP</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.loginBtnContainer]}
            onPress={siginButtonHandler}>
            <Text style={styles.btnText}>SIGN IN</Text>
          </TouchableOpacity>
        )}
      </View>

      {showResendOTP && (
        <TouchableOpacity
          style={styles.resendotpContainer}
          onPress={resenndOtpHanlder}>
          <Text style={styles.resendotp}>Resend OTP</Text>
        </TouchableOpacity>
      )}
      <View style={styles.errorMessageContainer}>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    </ScrollView>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 8,
  },
  commontext: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.black,
  },
  subCommontext: {fontSize: 15, fontWeight: '700', color: colors.black},

  otpWraper: {paddingHorizontal: 8},
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50,
  },
  otpBox: {borderRadius: 5, borderColor: colors.buttons, borderWidth: 1.5},
  otpText: {
    fontSize: 25,
    color: colors.black,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  loginBtnContainer: {
    backgroundColor: colors.buttons,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
    borderRadius: 5,
    marginBottom: 30,
    marginTop: 40,
  },
  otphead: {
    fontSize: 19,
    color: colors.black,
    fontWeight: '600',
  },
  btnText: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.white,
    paddingVertical: 10,
  },
  resendotpContainer: {paddingHorizontal: 8},
  resendotp: {color: colors.buttons},
  errorMessageContainer: {alignItems: 'center'},
  errorMessage: {fontSize: 15, color: colors.error, fontWeight: '700'},
});
