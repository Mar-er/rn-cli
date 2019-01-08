import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Svg, {
  Circle,
  G,
  Text,
  Path,
  LinearGradient,
  Stop,
  ClipPath,
} from 'react-native-svg';

export default class LiquidFill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // d: "M0 250 C128 250 142 250 252 250 L252 252 L0 252 Z0 110",
      // d: "M0   C128 154 142 60 252 126 L252 252 L0 252 Z0 110",
      d: this.setPath(props.percent),
      d1: this.setPath1(props.percent),
    };
  }

  setPath = (percent) => {
    const point = 250 - 2.5 * percent;
    if (percent === 0 || percent === 100) {
      return `M0 ${point} C65 ${point} 120 ${point} 252 ${point} L252 252 L0 252 Z0 110`;
    }
    return `M0 ${point - 20} C130 ${point + 70} 125 ${point - 60} 252 ${point + 1} L252 252 L0 252 Z0 110`;
  }

  setPath1 = (percent) => {
    const point = 250 - 2.5 * percent;
    if (percent === 0 || percent === 100) {
      return `M0 ${point} C65 ${point} 120 ${point} 252 ${point} L252 252 L0 252 Z0 110`;
    }
    return `M0 ${point + 20} C130 ${point - 70} 125 ${point + 60} 252 ${point - 5} L252 252 L0 252 Z0 110`;
  }

  render() {
    const { d, d1 } = this.state;
    const { percent, gradualColor, borderColor } = this.props;
    let x; let
      xUnit;
    const y = 256 / 2 + 22;
    if (percent < 10) {
      x = 256 / 2 - 40;
      xUnit = 256 / 2;
    } else if (percent === 100) {
      x = 256 / 2 - 80;
      xUnit = 256 / 2 + 40;
    } else {
      x = 256 / 2 - 60;
      xUnit = 256 / 2 + 20;
    }

    return (
      <View style={styles.container}>
        <Svg height={256} width={256}>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={gradualColor[0]} stopOpacity="1" />
            <Stop offset="100%" stopColor={gradualColor[1]} stopOpacity="1" />
          </LinearGradient>
          <LinearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={gradualColor[0]} stopOpacity="0.3" />
            <Stop offset="100%" stopColor={gradualColor[1]} stopOpacity="0.5" />
          </LinearGradient>
          <Circle
            cx="128"
            cy="128"
            r="122"
            stroke={borderColor}
            fill="none"
            strokeWidth="6"
          />
          <G>
            <Circle
              cx="128"
              cy="128"
              r="122"
              fill="url(#grad1)"
              clipPath="url(#clip1)"
            />
            <ClipPath id="clip1">
              <Path
                d={d1}
                stroke="yellow"
              />
            </ClipPath>
          </G>
          <G>
            <Circle
              cx="128"
              cy="128"
              r="124"
              fill="url(#grad)"
              clipPath="url(#clip)"
            />
            <ClipPath id="clip">
              <Path
                d={d}
                stroke="red"
              />
            </ClipPath>
          </G>
          <Text
            x={x}
            y={y}
            fontSize="64"
            fonWeight="bold"
            fill="#ffc14d"
          >
            {percent}
            <Text
              x={xUnit}
              y={y}
              fontSize="64"
              fonWeight="bold"
              fill="#ffc14d"
            >%
            </Text>
          </Text>
        </Svg>
      </View>
    );
  }
}

LiquidFill.defaultProps = {
  percent: 20,
  gradualColor: ['#ff8480', '#fa5656'],
  borderColor: '#fa5656',
};

LiquidFill.propTypes = {
  percent: PropTypes.number,
  gradualColor: PropTypes.array,
  borderColor: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
