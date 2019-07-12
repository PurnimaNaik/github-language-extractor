import React from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions, Image } from 'react-native';
// import ProgressCircleBase from './ProgressCircleBase';searchIcon.png

const SearchBar = ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
      <Image  style={styles.searchIcon} source={require('../Images/searchIcon.png')} />
        <TextInput placeholder="Enter username">
        </TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    // justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: Dimensions.get('window').width - 50,
    borderRadius: 45,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginTop: 25,
  },
  searchIcon: {
    height: 23,
    width: 23,
    marginLeft: 10,
    marginRight: 5,
    justifyContent: 'center',
  },
  categoryTwo: {
    opacity: 0.5,
    position: 'absolute',
  },
});

export default SearchBar;
