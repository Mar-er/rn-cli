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

const Test = (props) => {
  console.log(19, props);
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Test
      </Text>
      <Button
        title="我的"
        onPress={() => { props.navigation.navigate('Test'); }}
      />
    </View>
  );
};

Test.navigationOptions = {
  title: 'Profile',
};

export default Test;
