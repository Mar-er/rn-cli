import React from 'react';
import {
  View, Text, Button, StyleSheet, ScrollView,
} from 'react-native';
import Svg, {
  Circle, Rect,
} from 'react-native-svg';
import SvgUri from 'react-native-svg-uri';
import Xlog from 'react-native-xlog';
import LinearGradient from 'react-native-linear-gradient';
import { VictoryBar } from 'victory-native';
import { api } from '../../../utils';
import { helper } from '../../../config';
import Icon from '../../../components/Icon';
import CSvgUri from '../../../components/Svg';
import LiquidFill from '../../../components/LiquidFill';

const styles = StyleSheet.create({
  linearGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});
export default ({ navigation }) => {
  Xlog.info('tag', 'log');

  const onPress = () => {
    api.post(helper.apiResolve('cjyun', '/api/auth/login'), {
      account: '余乐2017360405',
      password: '123456',
    }).then((res) => {
      console.log(37, res);
    }).catch(e => console.log(39, e));
  };

  return (
    <ScrollView style={{ backgroundColor: '#333' }}>
      <Text>Login</Text>
      <Button
        title="点击登陆"
        onPress={onPress}
      />
      <Icon name="dingzheng" size={60} />
      <Svg height={300} width={300} viewBox="0 0 100 100">
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
      <VictoryBar />
      <LiquidFill />
      <LinearGradient colors={['#FFD801', '#FF8040', '#F75D59']} style={styles.linearGradient}>
        <Text style={{ color: '#fff' }}>
          Sign in with Facebook
        </Text>
      </LinearGradient>
    </ScrollView>
  );
};
