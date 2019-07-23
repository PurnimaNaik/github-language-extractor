/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Dimensions, Platform } from 'react-native';

import SearchBar from './src/Components/SearchBar';
import Colors from './src/Utils/Colors';

const App = () => {
  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
      <View style={styles.titleContainer}>
      <Text style={styles.title}>Github Language Extractor</Text>
      </View>
      
        <SearchBar />
      </View>
      
      <View>
          
          </View>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:Platform.OS === 'android'?50:0,
    flex:1,
    backgroundColor:'white',
    alignItems: 'center',
  },
  titleContainer:{
    width:Dimensions.get('window').width,
    backgroundColor:'#6AB9FF',
    height:40,
    justifyContent:'center',
  },
  title:{
    // fontFamily:'Cochin',
    // fontFamily:'Helvetica',
    fontSize:23,
    color:'white',
    marginLeft:15
  },
  contentContainer: {
    marginTop:20,
    alignItems: 'center',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
