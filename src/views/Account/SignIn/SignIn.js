import React from 'react';
import {
  View, Text, Button, StyleSheet, Dimensions,
} from 'react-native';
import Svg, {
  Circle, Rect,
} from 'react-native-svg';
import SvgUri from 'react-native-svg-uri';
import Icon from '../../../components/Icon';
import CSvgUri from '../../../components/Svg';

const { width, height } = Dimensions.get('window');
export default ({ navigation }) => (
  <View>
    <Text>SignIn</Text>
    <Button
      title="点击登陆"
      onPress={() => { navigation.navigate('App'); }}
    />
    <Icon name="dingzheng" size={60} />
    <View
      style={[
        StyleSheet.absoluteFill,
        { alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      <Svg height={height * 0.5} width={width * 0.5} viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke="blue"
          strokeWidth="2.5"
          fill="green"
        />
        <Rect
          x="15"
          y="15"
          width="70"
          height="70"
          stroke="red"
          strokeWidth="2"
          fill="yellow"
        />
      </Svg>
      <SvgUri
        width="200"
        height="200"
        source={{ uri: 'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg' }}
      />
      <CSvgUri
        width="200"
        height="200"
        source="no-data"
      />
    </View>
  </View>
);
