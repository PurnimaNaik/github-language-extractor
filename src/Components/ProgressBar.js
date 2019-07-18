'use strict';
import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
// import SvgUri from 'react-native-svg-uri';
// import styles from './DrawerComponentStyles';
// import {colors} from '../../../utils'

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.startAnimation();
  }
  startAnimation = () => {
    const endWidth = this.props.percentage;
    Animated.timing(this.state.width, {
      toValue: endWidth,
      duration: 1000,
      easing: Easing.linear,
    }).start();
  };

  render() {
    //   console.log("progressStatus",this.state.progressStatus);
    return (
      <View key={this.props.language}>
        <Text style={styles.label}>
          {this.props.language}-{this.props.percentage}%
        </Text>

        <View style={styles.container}>
          <Animated.View
            // style={[styles.content, { width:(((Dimensions.get('window').width - 50)*this.props.percentage)/100) }]}
            style={[
              styles.content,
              {
                width: this.state.width.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '1%'],
                }),
              },
            ]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 50,
    // backgroundColor: 'transparent',
    //   alignItems: 'center',
    backgroundColor: '#EBEBEB',
    marginBottom: 25,
  },
  content: {
    // width: ((Dimensions.get('window').width - 50)*90)/100,
    //(((Dimensions.get('window').width - 50)*this.state.progressStatus)/100)
    height: 30,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  label: {
    color: 'black',
    // marginLeft: 10,
  },
});

export default ProgressBar;

// export const DrawerTab = props => {
//   return (
//     <View style={styles.drawerTabContainer}>
//       <View style={[styles.drawerTab, props.style]} />
//     </View>
//   );
// };

// const SVGS = {
//   car: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
// }
