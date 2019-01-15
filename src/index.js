import React, { Fragment } from 'react';
import Orientation from 'react-native-orientation';
import SplashScreen from 'react-native-splash-screen';
import {
  StatusBar, View, NativeModules, Platform,
} from 'react-native';
import App from './initial';

const { StatusBarManager } = NativeModules;

class AuthLoading extends React.Component {
  componentDidMount() {
    Orientation.lockToPortrait();
    SplashScreen.hide();
  }

  render() {
    this.STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT - 0;

    return (
      <Fragment>
        <StatusBar
          backgroundColor="transparent"
          translucent
        />
        <View style={{ paddingTop: this.STATUSBAR_HEIGHT, backgroundColor: 'blue', flex: 1 }}>
          <App />
        </View>
      </Fragment>
    );
  }
}

export default AuthLoading;
