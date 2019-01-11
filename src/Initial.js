import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Orientation from 'react-native-orientation';
import SplashScreen from 'react-native-splash-screen';
import {
  StatusBar, View, NativeModules, Platform,
} from 'react-native';
import Progress from './components/Progress';

const { StatusBarManager } = NativeModules;

class AuthLoading extends React.Component {
  componentDidMount() {
    Orientation.lockToPortrait();
    SplashScreen.hide();
  }

  render() {
    const { children } = this.props;
    const progress = 0;

    this.STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT - 0;

    return (
      <Fragment>
        <StatusBar
          backgroundColor="transparent"
          translucent
        />
        {
          progress
            ? <Progress progress={progress} />
            : null
        }
        <View style={{ paddingTop: this.STATUSBAR_HEIGHT, backgroundColor: 'blue', flex: 1 }}>
          {children}
        </View>
      </Fragment>
    );
  }
}

AuthLoading.propTypes = {
  children: PropTypes.element.isRequired,
};

AuthLoading.defaultProps = {
};

export default AuthLoading;
