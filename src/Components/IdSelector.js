import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React,{useContext} from 'react';
import {colors} from '../../src/Globals/Styles'
import { Icon } from '@rneui/base';
import LoginContext from '../Contexts/LoginBtnContext';

const IdSelector = () => {
    const {isAdhaar,setIsAdhaar,setIsPanCard,isPanCard} =useContext(LoginContext);
  return (
    <View>
      <View style={styles.selectIdContainer}>
        <TouchableOpacity style={styles.idContainer} onPress={()=>setIsAdhaar(!isAdhaar)}>
          <Text style={styles.idCaption}>Aadhaar Card</Text>
          <Icon
            name="id-card"
            type="font-awesome"
            color="white"
            iconStyle={{fontSize: 30}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.idContainer} onPress={()=>setIsPanCard(!isPanCard)}>
          <Text style={styles.idCaption}>Pan Card</Text>
          <Icon
            name="vcard"
            type="font-awesome"
            color="white"
            iconStyle={{fontSize: 30}}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text>
          Your privacy is important to us. The details shared are used with
          complete discretion and stroed securely
        </Text>
      </View>
    </View>
  );
};

export default IdSelector;

const styles = StyleSheet.create({
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
});
