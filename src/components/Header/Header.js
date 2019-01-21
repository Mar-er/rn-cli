// 各页面头部绿色栏
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import styles from './style.scss';
import { CustomButton } from '../Icon';

@withNavigation
class Header extends Component {
  // 点击 < 回到上一页
  onLeft = (e) => {
    const { onLeft, navigation } = this.props;
    if (onLeft) {
      onLeft(e);
    } else {
      navigation.pop();
    }
  }

  renderRight = (text) => {
    if (text) {
      if (text.constructor === String || text.constructor === Array) {
        return <Text style={styles.title}>{text}</Text>;
      }
      return text;
    }
    return null;
  }

  render() {
    const {
      title, leftText, rightText, onPress,
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.header_box}>
          <View style={styles.left}>
            <CustomButton
              name="fanhui"
              style={styles.buttonStyle}
              onPress={this.onLeft}
            >
              <Text style={styles.title}>{leftText}</Text>
            </CustomButton>
          </View>
          <View style={styles.center}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.right}>
            {
              this.renderRight(rightText)
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  onLeft: PropTypes.func,
  leftText: PropTypes.any,
  rightText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  onPress: PropTypes.func,
  navigation: PropTypes.object,
};

Header.defaultProps = {
  title: null,
  onLeft: null,
  leftText: null,
  rightText: null,
  onPress: () => {},
  navigation: null,
};

// {
//   headerRight
//   headerLeft
//   headerTitle

//   headerStyle
//   headerRightContainerStyle
//   headerLeftContainerStyle
//   headerTitleContainerStyle
// }

export default Header;
