import React, { Fragment } from 'react';
import Orientation from 'react-native-orientation';
import {
  StatusBar, TextInput, Text,
} from 'react-native';
import App from './initial';
import Adaptation from './components/Adaptation';

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
          // barStyle="light-content" // 状态栏文字颜色白色
          barStyle="dark-content" // 状态栏文字颜色黑色
        />
        <Adaptation>
          <App />
        </Adaptation>

      </Fragment>
    );
  }
}

export default AuthLoading;
