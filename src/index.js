import React, { Fragment } from 'react';
import Orientation from 'react-native-orientation';
import {
  StatusBar, View, TextInput, Text,
} from 'react-native';
import App from './initial';
import Adaptation from './components/Adaptation';
import { deviceInfo } from './utils';

// 通过修改TextInput、Text组件的defaultProps来使其不随系统字体大小的变化而变化，避免布局混乱
// https://www.jianshu.com/p/d2f9ce14127a
TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, { defaultProps: false });
Text.defaultProps = Object.assign({}, Text.defaultProps, { allowFontScaling: false });

class AuthLoading extends React.Component {
  componentDidMount() {
    Orientation.lockToPortrait();
  }

  render() {
    return (
      <Fragment>
        <StatusBar
          backgroundColor="#ffffff"
          translucent
          // barStyle="light-content" // 状态栏文字颜色白色
          barStyle="dark-content" // 状态栏文字颜色黑色
        />
        <View style={{ paddingTop: deviceInfo.statusHeight, backgroundColor: 'white', flex: 1 }}>
          <Adaptation>
            <App />
          </Adaptation>
        </View>

      </Fragment>
    );
  }
}

export default AuthLoading;
