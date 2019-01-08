import React from 'react';
import PropTypes from 'prop-types';
import Orientation from 'react-native-orientation';
import SplashScreen from 'react-native-splash-screen';

class AuthLoading extends React.Component {
  componentDidMount() {
    Orientation.lockToPortrait();
    SplashScreen.hide();
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

AuthLoading.propTypes = {
  children: PropTypes.element.isRequired,
};

AuthLoading.defaultProps = {
};

export default AuthLoading;
