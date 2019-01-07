import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const MainScreen = ({ navigation }) => (
  <View style={styles.container}>
    <LoginStatusMessage />
    <AuthButton />
    <Button
      title="go to tab"
      onPress={() => navigation.navigate('App')}
    />
  </View>
);

MainScreen.navigationOptions = {
  title: 'Home Screen',
};

export default MainScreen;
