import React from 'react';
import { View, Text, Button } from 'react-native';

export default ({ navigation }) => (
  <View>
    <Text>Home</Text>
    <Button
      title="做题记录筛选"
      onPress={() => { navigation.navigate('DoRecord'); }}
    />
  </View>
);
