import { Dimensions, PixelRatio } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

export const zoomScreen = (dwidth = 750, dheight = 1334, dim = 'screen') => {
  const { width, height } = Dimensions.get(dim);
  const virtualMenuHeight = ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT');
  console.log(7, virtualMenuHeight);
  const clearHeight = height - virtualMenuHeight;
  const designSize = { width: dwidth, height: dheight };
  const pxRatio = PixelRatio.get(dim);

  // 将dp转为px
  const w = PixelRatio.getPixelSizeForLayoutSize(width);
  const h = PixelRatio.getPixelSizeForLayoutSize(clearHeight);

  // 竖屏时横向铺满
  if (dwidth < dheight) {
    const fixedWidthDesignScale = designSize.width / w;
    const fixedWidthWidth = designSize.width;
    const fixedWidthHeight = h * fixedWidthDesignScale;
    const fixedWidthScale = 1 / pxRatio / fixedWidthDesignScale;

    return {
      width: fixedWidthWidth, height: fixedWidthHeight, scale: fixedWidthScale,
    };
  }

  // 横屏事件纵向铺满
  const fixedHeightDesignScale = designSize.height / h;
  const fixedHeightWidth = w * fixedHeightDesignScale;
  const fixedHeightHeight = designSize.height;
  const fixedHeightScale = 1 / pxRatio / fixedHeightDesignScale;

  return {
    width: fixedHeightWidth, height: fixedHeightHeight, scale: fixedHeightScale,
  };
};

export const adaptiveRotation = () => {
  const { width: SWidth, height: SHeight } = Dimensions.get('screen');
  let width;
  let height;
  let scale;

  // 屏幕宽高
  if (SWidth > SHeight) {
    ({
      width,
      height,
      scale,
    } = zoomScreen(1334, 750));
  } else {
    ({
      width,
      height,
      scale,
    } = zoomScreen());
  }

  return { width, height, scale };
};
