import React, { Component } from 'react';
import {
  Dimensions,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import SplashScreen from 'react-native-splash-screen';
import { zoomScreen, adaptiveRotation } from '../../utils/adaptation';

export default class Adaptation extends Component {
  constructor(props) {
    super(props);
    const {
      width,
      height,
      scale,
    } = zoomScreen();
    this.state = {
      width,
      height,
      scale,
    };
  }

  componentDidMount() {
    // 在适配组件中关闭启动页可以避免打开应用时出现界面先正常显示然后缩放造成闪现问题
    SplashScreen.hide();
    Dimensions.addEventListener('change', this.onLayout);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onLayout);
  }

  onLayout = () => {
    const {
      width,
      height,
      scale,
    } = adaptiveRotation();

    const { width: oldWidth } = this.state;
    if (oldWidth !== width) {
      this.setState({
        width,
        height,
        scale,
      });
    }
  }

  render() {
    const { children, style, ...rest } = this.props;
    const {
      width,
      height,
      scale,
    } = this.state;
    return (
      <View
        onLayout={this.onLayout}
        {...rest}
        style={[{
          width,
          height,
          backgroundColor: 'transparent',
          transform: [{ translateX: -width * 0.5 },
            { translateY: -height * 0.5 },
            { scale },
            { translateX: width * 0.5 },
            { translateY: height * 0.5 }],
        }, style]}
      >
        {children}
      </View>
    );
  }
}

Adaptation.defaultProps = {
  style: {},
};

Adaptation.propTypes = {
  children: PropTypes.element.isRequired,
  style: PropTypes.object,
};
