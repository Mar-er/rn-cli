import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default () => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      {/* <DrawerItems {...props} /> */}
      <View><Text>fdsfds</Text></View>
    </SafeAreaView>
  </ScrollView>
);
