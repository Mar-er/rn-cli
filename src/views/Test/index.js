import { SafeAreaView } from 'react-navigation';
import {
  ScrollView, StyleSheet, View, Text,
} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  box: {
    backgroundColor: 'pink',
  },
});

const CustomDrawerContentComponent = props => (
  <ScrollView style={styles.container}>
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }} style={styles.wrap}>
      {/* <DrawerItems {...props} /> */}
      <View style={styles.box}><Text>我是模态</Text></View>
    </SafeAreaView>
  </ScrollView>
);

export default CustomDrawerContentComponent;
