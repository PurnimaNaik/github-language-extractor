import React from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions} from 'react-native';
// import ProgressCircleBase from './ProgressCircleBase';

const SearchBar = ({}) => {
  return (
    <View style={styles.container}>
    <View style={styles.searchBox}>
    <TextInput style={styles.textBox} placeholder="Enter username"></TextInput>
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
    backgroundColor: 'white',
    justifyContent: 'center',
    // alignItems: 'left',
    height: 30,
    width: Dimensions.get('window').width-50,
    borderRadius: 45,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginTop:25,
    
  },
  textBox:{
    paddingLeft:10,
  },
  categoryOne: {
    opacity: 1,
    position: 'absolute',
  },
  categoryTwo: {
    opacity: 0.5,
    position: 'absolute',
  },
});

export default SearchBar;
