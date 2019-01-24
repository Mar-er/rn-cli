import React from 'react';
import { View, Text, Button } from 'react-native';

export default ({ navigation }) => (
  <View>
    <Text>Home</Text>
    <Button
      title="Test"
      onPress={() => { navigation.navigate('Test1'); }}
    />
  </View>
);
