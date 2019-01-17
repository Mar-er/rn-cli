import React, { Fragment } from 'react';
import Orientation from 'react-native-orientation';
import {
  StatusBar, View,
} from 'react-native';
import App from './initial';
import Adaptation from './components/Adaptation';
import { deviceInfo } from './utils';

class AuthLoading extends React.Component {
  componentDidMount() {
    Orientation.lockToPortrait();
  }

  render() {
    return (
      <Fragment>
        <StatusBar
          backgroundColor="transparent"
          translucent
        />
        <View style={{ paddingTop: deviceInfo.statusHeight, backgroundColor: 'white', flex: 1 }}>
          <Adaptation>
            <App />
          </Adaptation>
        </View>

      </Fragment>
    );
  }
}

export default AuthLoading;
