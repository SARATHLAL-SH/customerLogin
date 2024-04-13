import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../Globals/Styles';
import {Icon} from '@rneui/base';
import {TextInput} from 'react-native';
import axios from 'axios';
import {API} from '../utils/apiutils';
import {CategoryData} from '../data';
import {IMAGE_URL} from '../utils/apiutils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

// import Header from './Header';

const SearchBar = () => {
  const {categoryData, error} = CategoryData();
  const [inputValue, setInputValue] = useState();
  const [filterdata, setFilterData] = useState([]);
  const Navigation = useNavigation();
console.log("errir:," , error)
  useEffect(() => {
    if (!inputValue) {
      setFilterData(categoryData);
    } else {
      const filtered = categoryData.filter(data =>
        data.name.toLowerCase().startsWith(inputValue.toLowerCase()),
      );
      setFilterData(filtered, categoryData);
    }
  }, [inputValue, categoryData]);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          
          Network Error. Please try again later.
        </Text>
      </View>
    );
  }

  const renderItem = ({item}) => (
    <View style={styles.categoryContainer}>
      {/* {console.log(item)} */}
      <Text style={{color:"black", marginTop:20,fontWeight:"700",fontSize:22}}>   {item.name}</Text>
      <Image
        source={{uri: 'http://192.168.0.114:2020/get/image/' + item.image} } 
        style={styles.image}
      />
    
      <Text style={{color:"black"}}>{item.description}</Text>
    </View>
  );
  const signoutHandler = async () => {
    await AsyncStorage.removeItem('token');
    // await AsyncStorage.setItem('token', null);
    Navigation.navigate('Signin');
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.vwSearch}>
          <Icon
            name="search"
            type="font-awesome"
            color={colors.homePrimary}
            iconStyle={{fontSize: 25}}
          />
        </View>
        <TextInput
          style={styles.textInput}
          value={inputValue}
          onChangeText={text => setInputValue(text)}
        />
      </View>
      <TouchableOpacity onPress={signoutHandler}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <View style={{backgroundColor: colors.white}}>
        <Text>hai sura wineshops</Text>
        <Text>{IMAGE_URL}</Text>

        <FlatList
          data={filterdata}
          renderItem={renderItem}
          keyExtractor={item => item._id.toString()}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    backgroundColor: colors.white,
    width: '90%',
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    elevation: 10,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 6,
    borderColor: colors.white,
    marginTop: 100,
  },
  vwSearch: {
    justifyContent: 'center',
    alignItems: 'flex-end',

    paddingLeft: 5,
  },
  textInput: {
    backgroundColor: '#d90785',
    width: '90%',
    fontSize: 22,
    fontWeight: '700',
    padding: 0,
    paddingLeft: 5,
    color: colors.white,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    margin:5
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  categoryContainer:{
    // flexDirection:'row',
    // justifyContent:'center',
    alignItems:'center'
  }
});
