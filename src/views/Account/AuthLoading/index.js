import React from 'react';

class AuthLoading extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 10000);
  }

  render() {
    return null;
  }
}

export default AuthLoading;
