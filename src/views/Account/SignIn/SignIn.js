import React from 'react';
import { View, Text, Button } from 'react-native';
import Icon from '../../../components/Icon';

export default ({ navigation }) => (
  <View>
    <Text>SignIn</Text>
    <Button
      title="点击登陆"
      onPress={() => { navigation.navigate('App'); }}
    />
    <Icon name="dingzheng" size={60} />
  </View>
);
