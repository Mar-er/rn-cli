import React, { Fragment } from 'react';
import Orientation from 'react-native-orientation';
import {
  StatusBar, NativeModules, Platform,
} from 'react-native';
import App from './initial';
import Adaptation from './components/Adaptation';

const { StatusBarManager } = NativeModules;

class AuthLoading extends React.Component {
  componentDidMount() {
    Orientation.lockToPortrait();
  }

  render() {
    this.STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT - 0;

    return (
      <Fragment>
        <StatusBar
          backgroundColor="transparent"
          translucent
        />
        <Adaptation style={{ paddingTop: this.STATUSBAR_HEIGHT, backgroundColor: 'white' }}>
          <App />
        </Adaptation>
      </Fragment>
    );
  }
}

export default AuthLoading;
