import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
} from 'react-native';
// import ProgressCircleBase from './ProgressCircleBase';searchIcon.png
var deepLanguageCollection = {};
var total=null;
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCollection: [],
      languageURlCollection: [],
      response: null,
      repoLanguageResponse: null,
    };
  }

  getUserRepos = username => {
    try {
      fetch('https://api.github.com/users/' + username + '/repos', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState(
            {
              response: responseJson,
            },
            () => {
              this.getShallowLanguagePool();
            }
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  getShallowLanguagePool = () => {
    var langauageArray = [];
    var languageURLArray = [];
    for (i = 0; i < this.state.response.length; i++) {
      langauageArray.push(this.state.response[i].language);
      languageURLArray.push(this.state.response[i].languages_url);
    }

    this.setState(
      {
        languageCollection: langauageArray,
        languageURlCollection: languageURLArray,
      },
      () => {
        // console.log("languageCollection",this.state.languageCollection);
        // console.log("languageURlCollection",this.state.languageURlCollection);
        this.getDeepLanguagePool();
      }
    );
  };

  getDeepLanguagePool = () => {
    // console.log('getDeepLanguagePool');
    for (i = 0; i < this.state.languageURlCollection.length; i++) {
    // for (i = 0; i <= 1; i++) {
      try {
        fetch(this.state.languageURlCollection[i], {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(responseJson => {
            this.setState(
              {
                repoLanguageResponse: responseJson,
              },
              () => {
                this.poolLanguagesFromRepos();
              }
            );
          });
      } catch (error) {
        console.log(error);
      }
    }
  };


  poolLanguagesFromRepos = () => {
    var key, value, keyString;
    console.log('RESPONSE', this.state.repoLanguageResponse);
    for (i = 0; i < Object.keys(this.state.repoLanguageResponse).length; i++) {
      // console.log("Object.keys(this.state.repoLanguageResponse)[i]",Object.keys(this.state.repoLanguageResponse)[i]);
      key = Object.keys(this.state.repoLanguageResponse)[i];
      value = this.state.repoLanguageResponse[
        Object.keys(this.state.repoLanguageResponse)[i]
      ];
      total+=value;
      keyString=key.toString();


      if (deepLanguageCollection!=null && deepLanguageCollection[key]!=null) {
        // deepLanguageCollection.push({
        //   key: Object.keys(this.state.repoLanguageResponse)[i],
        //   value: value*0.00001,
        // });
        deepLanguageCollection[keyString]=deepLanguageCollection[key]+value;
      } else {
        deepLanguageCollection[keyString]=value;
      }
      console.log("deepLanguageCollection",deepLanguageCollection)
      console.log("total",total)

    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <Image
            style={styles.searchIcon}
            source={require('../Images/searchIcon.png')}
          />
          <TextInput
            style={styles.textBox}
            placeholder="Enter username"
            onSubmitEditing={event => this.getUserRepos(event.nativeEvent.text)}
          />
        </View>
      </View>
    );
  }
}

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
  textBox: {
    width: Dimensions.get('window').width - 100,
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
