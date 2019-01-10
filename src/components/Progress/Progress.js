import React from 'react';
import { ProgressViewIOS, ProgressBarAndroid, Platform } from 'react-native';
import PropTypes from 'prop-types';

const Progress = ({ progress }) => {
  const isIos = Platform.OS === 'ios';

  const defaultProps = {
    animating: true,
    color: 'pink',
    styleAttr: 'Horizontal',
    indeterminate: false,
    style: {
      height: 20, marginTop: -9, marginBottom: -9,
    },
  };

  return (
    isIos
      ? <ProgressViewIOS />
      : <ProgressBarAndroid {...defaultProps} progress={progress} />
  );
};

Progress.propTypes = {
  progress: PropTypes.number,
};

Progress.defaultProps = {
  progress: 0,
};

export default Progress;
