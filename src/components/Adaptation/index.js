import React, { Component } from 'react';
import {
  Dimensions,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import SplashScreen from 'react-native-splash-screen';
import { zoomScreen } from '../../utils';

export default class Adaptation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getZoomScreen();
    Dimensions.addEventListener('change', this.getZoomScreen);
  }

  componentDidUpdate() {
    const { width } = this.state;
    if (width) {
      // 在适配组件中关闭启动页可以避免打开应用时出现界面先正常显示然后缩放造成闪现问题
      SplashScreen.hide();
    }
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.getZoomScreen);
  }

  getZoomScreen = () => zoomScreen().then((adaptation) => {
    const { width, height, scale } = adaptation;
    const { width: oldWidth } = this.state;
    if (oldWidth !== width) {
      this.setState({
        width,
        height,
        scale,
      });
    }
  }).catch((e) => { console.log(39, e); })

  render() {
    const { children, style, ...rest } = this.props;
    const {
      width,
      height,
      scale,
    } = this.state;

    if (!width) return null;

    return (
      <View
        onLayout={this.onLayout}
        {...rest}
        style={{
          width,
          height,
          backgroundColor: 'transparent',
          transform: [{ translateX: -width * 0.5 },
            { translateY: -height * 0.5 },
            { scale },
            { translateX: width * 0.5 },
            { translateY: height * 0.5 }],
        }}
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
