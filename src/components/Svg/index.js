import React from 'react';
import SvgUri from 'react-native-svg-uri';
import PropTypes from 'prop-types';
import svgs from '../../public/svg';

const Svg = ({
  source,
  color,
  height,
  width,
  style,
}) => {
  const svgXmlData = svgs[source];

  if (!svgXmlData) {
    throw new Error(`没有"${source}"这个svg，请下载svg并放入public/svg下执行 npm run svg-to-xml`);
  }

  return (
    <SvgUri
      width={width}
      height={height}
      svgXmlData={svgXmlData}
      fill={color}
      style={style}
    />
  );
};

Svg.defaultProps = {
  color: null,
  width: '10',
  height: '10',
  style: {},
};

Svg.propTypes = {
  source: PropTypes.string.isRequired,
  color: PropTypes.string,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  style: PropTypes.object,
};

export default Svg;
