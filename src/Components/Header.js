import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {parameters} from '../Globals/Styles';
import {Icon} from '@rneui/base';
import {colors} from '../../src/Globals/Styles';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Assuming you're using MaterialCommunityIcons

const Header = ({title, name}) => {
  return (
    <View style={styles.header}>
      <Icon name={name} type="font-awesome" color={colors.white} />
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black,
    flexDirection: 'row',
    height: parameters.headerHeight,
    alignItems: 'center',
    paddingHorizontal: 8,
    width: '100%',
    borderBottomRightRadius: '30%',
    borderBottomLeftRadius: '30%',
  },
  headerText: {
    color: colors.headerText,
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 30,
  },
});
