import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const Test = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
        哈喽，又见面了，只要点击返回都会见到我咯，我是Test，我是个bug，快来解决我吧
    </Text>
  </View>
);

Test.navigationOptions = {
  title: 'Profile',
};

export default Test;
