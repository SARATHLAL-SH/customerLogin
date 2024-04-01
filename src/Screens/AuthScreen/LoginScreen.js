import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState, useRef, useContext} from 'react';
import Header from '../../Components/Header';
import {colors} from '../../Globals/Styles';
import LoginModal from '../../Components/LoginModal';
import LoginContext from '../../Contexts/LoginBtnContext';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const {mobileNumber} = useContext(LoginContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    require('../../../Assets/Images/barCvr.jpg'),
  );

  const modalToggleHandler = () => {
    setModalVisible(!modalVisible);
  };
  
  return (
    <>
      {/* <Header title="Login" name="arrow-left" /> */}
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image
            source={selectedImage}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height * 0.44,
            }}
          />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.bottomWraper}>
            <Text style={styles.AccountText}>ACCOUNT</Text>
            <Text style={styles.subHead}>
              login/Create Account to Manage Orders
            </Text>
            <TouchableOpacity
              style={styles.loginBtnContainer}
              onPress={modalToggleHandler}>
              <Text style={styles.btnText}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By Clicking, I accept the{' '}
                <Text style={styles.termsandCondtions}>
                  {' '}
                  Terms & Conditions{' '}
                </Text>{' '}
                and <Text style={styles.termsandCondtions}>Privacy Policy</Text>
              </Text>
            </View>
            <View style={styles.borderBtm}></View>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <LoginModal closeModal = {modalToggleHandler} />
                {mobileNumber?.replace(/[^0-9]/g, '').length < 10 ? (
                  <TouchableOpacity
                    style={[styles.loginBtnContainer]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.btnText}>CANCEL</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,

    backgroundColor: colors.black,
  },
  bottomWraper: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 8,
    marginHorizontal: 2,
    borderRadius: 10,
    paddingTop: 60,
  },
  AccountText: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.headerText,
  },
  subHead: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.black,
  },
  loginBtnContainer: {
    backgroundColor: colors.buttons,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
    borderRadius: 5,
    marginBottom: 80,
  },

  btnText: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.white,
    paddingVertical: 10,
  },
  termsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
  termsandCondtions: {
    color: colors.black,
    fontWeight: '600',
    textDecorationLine: 'underline',
    justifyContent: 'center',
  },

  termsText: {
    fontSize: Dimensions.get('screen').width * 0.03,
  },
  borderBtm: {
    borderBottomColor: colors.buttons,
    borderBottomWidth: 1.5,
    marginTop: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '99%',
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  open: {
    backgroundColor: '#F194FF',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
