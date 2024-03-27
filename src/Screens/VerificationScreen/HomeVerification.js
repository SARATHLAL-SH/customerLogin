import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import paper from '../../../Assets/Images/paper.jpg';
import {Icon} from '@rneui/themed';
import {colors} from '../../../src/Globals/Styles';
import { useNavigation } from '@react-navigation/native';

const HomeVerification = () => {
  const Navigation =useNavigation();
  const selectIDHandler=()=>{
Navigation.navigate("selectID");
  }
  return (
    <View style={styles.container}>
      {/* <Header title="Verify Age" name="arrow-left" /> */}

      <ImageBackground source={paper} style={styles.imageBackground}>
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <Icon
              raised
              name="user"
              type="font-awesome"
              color="#ed5924"
              iconStyle={{fontSize: 50}}
            />
            <Text style={styles.ageText}>21+</Text>
            <View style={styles.checkmark}>
              <Icon
                raised
                name="check"
                type="font-awesome"
                color="green"
                iconStyle={{fontSize: 50}}
              />
            </View>
          </View>
          <View style={styles.confirmTextContainer}>
            <Text style={styles.confirmText}>
              Confirm your age once to order from wine shops
            </Text>
          </View>
          <Text></Text>
          <View style={styles.rulesTextContainer}>
            <Icon
              raised
              name="check-square"
              type="font-awesome"
              color="green"
              iconStyle={{fontSize: 30}}
            />
            <Text style={styles.ruleText}>
              You must be of legal dringking age to order from wine shops.
            </Text>
          </View>
          <View style={styles.rulesTextContainer}>
            <Icon
              raised
              name="check-square"
              type="font-awesome"
              color="green"
              iconStyle={{fontSize: 30}}
            />
            <Text style={styles.ruleText}>
              As per Govt. guidelines, you have to upload a Govt.ID to verify
              your age.
            </Text>
          </View>

          <TouchableOpacity style={[styles.loginBtnContainer]} onPress={selectIDHandler}>
            <Text style={styles.btnText}>SELECT A GOVT ID</Text>
          </TouchableOpacity>
          <View>
            <Text>You must be atleast 21 yrs of age as per Govt guidelines</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeVerification;

const styles = StyleSheet.create({
  container: {flex: 1},
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  circleContainer: {
    alignItems: 'center',
    marginVertical: 20,
    flex: 1,
    paddingHorizontal: 8,
  },
  circle: {
    width: '32%',
    height: '18%',
    borderRadius: 68,
    borderWidth: 1,
    backgroundColor: colors.buttons,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    position: 'absolute',
    bottom: -10,
    right: -30,
  },
  ageText: {
    fontWeight: '900',
    fontSize: 26,
    color: colors.white,
  },
  rulesTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  ruleText: {fontWeight: '500', color: colors.black, fontSize: 17},
  confirmTextContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.orange,
  },
  loginBtnContainer: {
    backgroundColor: colors.buttons,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
    borderRadius: 5,
    marginBottom: 20,
    width: '99%',
  },

  btnText: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.white,
    paddingVertical: 10,
  },
});
