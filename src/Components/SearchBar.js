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

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCollection: [],
      languageURlCollection: [],
      deepLanguageCollection: [],
      response: null,
      repoLanguageResponse: null,
    };
  }

  getUserRepos = username => {
    console.log(username);
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
          console.log(responseJson);
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
    console.log('getDeepLanguagePool');
    for (i = 0; i < this.state.languageURlCollection.length; i++) {
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
            console.log(responseJson);
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
    var dictionary = [];

    console.log('cg', this.state.repoLanguageResponse);

    for (i=0;i<=this.state.repoLanguageResponse.length;i++){

      dictionary.push({
        key: Object.keys(ahash)[i],
        value: this.state.repoLanguageResponse[Object.keys(ahash)[i]],
      });

    }

    dictionary.push({
      key: 'keyName',
      value: 'the value',
    });

    this.setState(
      {
        deepLanguageCollection: dictionary,
      },
      () => {
        // console.log('hola', this.state.deepLanguageCollection);
      }
    );
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
