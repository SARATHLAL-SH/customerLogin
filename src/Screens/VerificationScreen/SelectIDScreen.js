import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useContext} from 'react';
import Header from '../../Components/Header';
import {colors} from '../../../src/Globals/Styles';
import {Icon} from '@rneui/base';
import AdhaarCard from '../../Components/AdhaarCard';
import IdSelector from '../../Components/IdSelector';
import LoginContext from '../../Contexts/LoginBtnContext';
import PanCard from '../../Components/PanCard';
import {useNavigation} from '@react-navigation/native';

const SelectIDScreen = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const {isAdhaar, setIsAdhaar, isPanCard, setIsPanCard} =
    useContext(LoginContext);
  const Navigation = useNavigation();

  const UploadIDHandler = () => {
    isAdhaar && Navigation.navigate('Upload Aadhaar');
    isPanCard && Navigation.navigate('Upload PanCard');
  };
  return (
    <View style={styles.container}>
      {/* <Header title="Select Govt ID to upload" name="arrow-left" /> */}
      <View style={styles.wraper}>
        <View>
          <View style={styles.subContainer}>
            <Text>Step 1/3</Text>
            <Text>Pick an ID with your latest updated photos</Text>
          </View>

          {isAdhaar ? <AdhaarCard /> : isPanCard ? <PanCard /> : <IdSelector />}
        </View>

        <View style={{paddingHorizontal: 8}}>
          {(isAdhaar || isPanCard) && (
            <View style={styles.termsContainer}>
              <TouchableOpacity
                onPress={() => setIsAccepted(!isAccepted)}
                style={styles.checkboxContianer}>
                {isAccepted ? (
                  <Icon
                    name="checkbox-active"
                    type="fontisto"
                    color="green"
                    iconStyle={{fontSize: 30}}
                  />
                ) : (
                  <Icon
                    name="checkbox-passive"
                    type="fontisto"
                    color="red"
                    iconStyle={{fontSize: 30}}
                  />
                )}
              </TouchableOpacity>

              <Text style={styles.termsText}>
                {' '}
                I agree to have my ID details and selfie uploaded for
                verification. I have read and accepted the terms of{' '}
                <TouchableOpacity style={{}}>
                  <Text style={{fontWeight: '700', paddingBottom: 0}}>
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={[styles.loginBtnContainer]}
            disabled={isAccepted ? false : true}
            onPress={UploadIDHandler}>
            <Text style={styles.btnText}>{`${
              isAccepted ? 'PROCEED TO VERIFY' : ' TERMS & CONDTIONS'
            }`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SelectIDScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  wraper: {
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    flex: 1,
  },
  selectIdContainer: {
    borderWidth: 0.5,
    borderColor: colors.black,
    marginVertical: 20,
    padding: 10,
  },
  idContainer: {
    padding: 20,
    borderBottomWidth: 0.5,
    marginTop: 5,
    backgroundColor: colors.rose,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  idCaption: {
    fontWeight: '700',
    fontSize: 22,
    color: colors.white,
  },
  loginBtnContainer: {
    backgroundColor: colors.buttons,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
    borderRadius: 5,
    marginBottom: 80,
  },
  checkboxContianer: {width: 40},
  btnText: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.white,
    paddingVertical: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  termsText: {
    marginLeft: 15,
    marginRight: 10,
  },
});
