import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,Platform
} from 'react-native';
// import ProgressCircleBase from './ProgressCircleBase';searchIcon.png
import NetInfo from '@react-native-community/netinfo';
import ProgressBar from './ProgressBar';
var deepLanguageCollection = {};
var total = null;
let progressBars = null;
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCollection: [],
      languageURlCollection: [],
      response: null,
      repoLanguageResponse: null,
      deepLanguageCollectionInState: null,
      totalInState: null,
      searchedUsername: null,
      searchEmpty: true,
      errorMessage: null,
      invalidUsernameMessage:
        'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.',
      borderBottomColor: 'transparent',
      showLoader: false,
      repoParsed:null,
    };
  }

  getUserRepos = username => {
    // this.deepLanguageCollection={};
console.log("borderBottomColor",this.state.borderBottomColor);
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        this.setState({
          errorMessage:
            'No internet connection detected. Please restore connection and try again.',
            showLoader: false,
        });
      } else {
        if (this.state.borderBottomColor != 'red') {
          deepLanguageCollection = {};
          total = null;
          this.setState(
            {
              searchedUsername: username.trim(),
              searchEmpty: true,
              errorMessage: null,
              borderBottomColor: 'transparent',
              deepLanguageCollectionInState: [],
              languageCollection: [],
              languageURlCollection: [],
              totalInState: null,
              showLoader: true,
              repoParsed:null,
            },
            () => {
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
                    this.textInput.clear();
                    if (responseJson.length == 0) {
                      this.setState({
                        errorMessage: 'User has no projects on Github.',
                        showLoader: false,
                      });
                    } else if (responseJson.message) {
                      this.setState({
                        errorMessage: responseJson.message,
                        showLoader: false,
                      });
                    } else {
                      this.setState(
                        {
                          response: responseJson,
                        },
                        () => {
                          this.getShallowLanguagePool();
                        }
                      );
                    }
                  });
              } catch (error) {
                console.log(error);
              }
            }
          );
        }
      }
    });
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
    // console.log('RESPONSE', this.state.repoLanguageResponse);
    for (i = 0; i < Object.keys(this.state.repoLanguageResponse).length; i++) {
      // console.log("Object.keys(this.state.repoLanguageResponse)[i]",Object.keys(this.state.repoLanguageResponse)[i]);
      key = Object.keys(this.state.repoLanguageResponse)[i];
      value = this.state.repoLanguageResponse[
        Object.keys(this.state.repoLanguageResponse)[i]
      ];
      total += value;
      keyString = key.toString();

      if (
        deepLanguageCollection != null &&
        deepLanguageCollection[key] != null
      ) {
        deepLanguageCollection[keyString] = deepLanguageCollection[key] + value;
      } else {
        deepLanguageCollection[keyString] = value;
      }
      // console.log("deepLanguageCollection",deepLanguageCollection)
      // console.log("total",total)
    }
    
    this.setState({
      deepLanguageCollectionInState: deepLanguageCollection,
      totalInState: total,
      showLoader: false,
      repoParsed:this.state.repoParsed+1,
    });
    // this.renderProgressBars(deepLanguageCollection, total);
  };
  // (java/total)*100

  renderProgressBars = deepLanguageCollection => {
    // console.log("-----renderProgressBars-----")
    // console.log(this.state.totalInState)
    const keys = Object.keys(deepLanguageCollection); // Get all keys from dictionary
    // console.log("deepLanguageCollectionInState",this.state.deepLanguageCollectionInState);
    // console.log("totalInState",this.state.totalInState);
    // console.log("deepLanguageCollection",this.deepLanguageCollection);
    // console.log("searchedUsername",this.state.searchedUsername);

  return keys.map((iteratorKey, index) => {
      // console.log(
      //   (deepLanguageCollection[iteratorKey] / this.state.totalInState) * 100
      // );
      // console.log('_______________________________________');
      return (
        <ProgressBar
          key={iteratorKey}
          percentage={(
            (deepLanguageCollection[iteratorKey] / this.state.totalInState) *
            100
          ).toFixed(2)}
          language={iteratorKey}
          color="#36c93d"
        />
      );
    });
  };

  clearSearchText = () => {
    this.textInput.clear();
    // deepLanguageCollection={};
    this.setState({
      searchEmpty: true,
      errorMessage: null,
      borderBottomColor: 'transparent',
      deepLanguageCollectionInState: null,
      languageCollection: [],
      languageURlCollection: [],
      repoParsed:null,
    });
  };

  validateInput = input => {
    var regex = '^[A-Za-z0-9][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*$';
    var validInput = input.match(regex);

    if (validInput) {
      this.setState({
        borderBottomColor: '#36c93d',
      });
    } else {
      this.setState({
        borderBottomColor: 'red',
      });
    }

    if (input != '') {
      this.setState({
        searchEmpty: false,
        deepLanguageCollectionInState: null,
      });
    } else {
      // this.deepLanguageCollection={};
      this.setState({
        searchEmpty: true,
        errorMessage: null,
        borderBottomColor: 'transparent',
        deepLanguageCollectionInState: null,
        languageCollection: [],
        languageURlCollection: [],
        repoParsed:null,
      });
    }
  };

  render() {

   const ProgressBars=()=>{
    // console.log("-----renderProgressBars-----")
    // console.log(this.state.totalInState)
    if(this.state.deepLanguageCollectionInState){
      const keys = Object.keys(this.state.deepLanguageCollectionInState); // Get all keys from dictionary
      return keys.map((iteratorKey, index) => {
          return (
            <ProgressBar
              key={iteratorKey}
              percentage={(
                (this.state.deepLanguageCollectionInState[iteratorKey] / this.state.totalInState) *
                100
              ).toFixed(2)}
              language={iteratorKey}
              color="#36c93d"
            />
          );
        });
    }
    else return <View></View>
    //  this.renderProgressBars(this.state.deepLanguageCollectionInState)
    }

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.searchBox,
            { borderBottomColor: this.state.borderBottomColor },
          ]}
        >
          <Image
            style={styles.searchIcon}
            source={require('../Images/searchIcon.png')}
          />
          <TextInput
            style={styles.textBox}
            placeholder="Enter username"
            onSubmitEditing={event => this.getUserRepos(event.nativeEvent.text)}
            ref={input => {
              this.textInput = input;
            }}
            onChange={event => this.validateInput(event.nativeEvent.text)}
          />

          {this.state.searchEmpty ? null : (
            <TouchableOpacity onPress={this.clearSearchText}>
              <Image
                style={styles.cancelIcon}
                source={require('../Images/cancel.png')}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.errorMessageContainer}>
          {this.state.borderBottomColor == 'red' ? (
            <Text style={styles.errorMessage}>
              {this.state.invalidUsernameMessage}
            </Text>
          ) : null}
          {this.state.errorMessage ? (
            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
          ) : null}
        </View>

        {this.state.deepLanguageCollectionInState ? (
          <Text style={styles.disclaimer}>
            {/* {this.state.searchedUsername}'s distribution */}
            Username: {this.state.searchedUsername}
          </Text>
        ) : null}

        {/* {this.state.deepLanguageCollectionInState ? (
        <View style={styles.divider} />
        ) : null} */}

        {// (!this.state.deepLanguageCollectionInState && !(this.state.response || this.state.errorMessage))?
         this.state.deepLanguageCollectionInState==null || this.state.repoParsed==null || Object.keys(this.state.languageURlCollection).length!=this.state.repoParsed? (
          // this.state.repoParsed ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : null}

        <View style={styles.scrollViewHeightContainer}>
          <View style={styles.scrollViewContainer}>
            {this.state.deepLanguageCollectionInState!=null && this.state.repoParsed!=null && Object.keys(this.state.languageURlCollection).length===this.state.repoParsed? (
              <ScrollView style={styles.progressBarConatiner}>
              <ProgressBars/>
              </ScrollView> 
            ) : null}
            <View style={styles.bottomShadow} />
          </View>
        </View>
      </View>
    );
  }
}

{
  /* <FlatList
data={this.state.deepLanguageCollectionInState}
// keyExtractor={(item, index) => index.toString()}
// renderItem={({ item }) => {
//   // if(!this.state.showStationsDrawer){
//   return this.renderProgressBars(item);
//   //  }
// }}
/> */
}
const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android'?20:10,
  },
  loaderContainer: {
    position: 'absolute',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    height: 40,
    width: Dimensions.get('window').width - 30,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginTop: 15,
    marginBottom: 20,
    borderBottomWidth: 1,
    elevation: 5,
  },
  textBox: {
    width: Dimensions.get('window').width - 100,
    fontSize: 19,
    marginBottom: Platform.OS === 'android'?-4:0,
    
  },
  searchIcon: {
    height: 30,
    width: 30,
    marginLeft: 5,
    marginRight: 2,
    justifyContent: 'center',
  },
  cancelIcon: {
    height: 16,
    width: 16,
    opacity: 0.5,
  },
  categoryTwo: {
    opacity: 0.5,
    position: 'absolute',
  },
  progressBarConatiner: {
    marginTop: 20,
    height: 50,
  },
  errorMessage: {
    color: '#6AB9FF',
    fontSize: 17,
    textAlign: 'center',
  },
  errorMessageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width - 100,
  },
  disclaimer: {
    color: 'black',
    fontSize: 19,
    marginLeft: 10,
    alignSelf: 'stretch',
    marginTop: 30,
    paddingBottom: 10,
  },
  divider: {
    borderBottomColor: '#C6C6C6',
    borderBottomWidth: StyleSheet.hairlineWidth,
    // alignSelf: 'stretch',
    width: Dimensions.get('window').width,
    marginBottom: 20,
  },
  scrollViewHeightContainer: {
    height: Dimensions.get('window').height / 1.6,
  },
  bottomShadow: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: StyleSheet.hairlineWidth,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 1,
    shadowRadius: 4,
    height: 0.5,
    backgroundColor: 'white',
    // elevation: 5,
  },
});

export default SearchBar;

const colors = [
  '#36c93d',
  '#ffc103',
  '#db0000',
  '#0049e6',
  '#ff8c00',
  '#ffc0cb',
  '#29b6f6',
];
               {/* <ScrollView style={styles.progressBarConatiner}>*/}
              //  progressBars
              {/* </ScrollView> */}