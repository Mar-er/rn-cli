import React from 'react';
import { View, Text, Button } from 'react-native';

export default ({ navigation }) => (
  <View>
    <Text>SignIn</Text>
    <Button
      title="点击登陆"
      onPress={() => { navigation.navigate('Tab'); }}
    />
  </View>
);
