import { Dimensions, NativeModules, PixelRatio } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import deviceInfo from './deviceInfo';

/**
 * 设计图按照iPhone8 (750 * 1334) 缩小一倍尺寸 (375 * 667) 设计
 * 为了适配手机和平板手机使用 375 * 667，平板使用 540 * 960
 * Android通过 NativeModules.IsPadModule.isPad 获取boolean值
 */
const zoomScreen = async () => {
  const pad = { width: 1920, height: 1080 };
  const phone = { width: 375, height: 667 };
  const dim = 'screen';
  const { width, height } = Dimensions.get(dim);
  const virtualMenuHeight = ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT');

  const isPad = await NativeModules.IsPadModule.isPad();
  const designSize = isPad ? pad : phone;

  // 减去状态栏和虚拟按键高度
  const clearHeight = height - virtualMenuHeight - deviceInfo.statusHeight;
  const pxRatio = PixelRatio.get(dim);

  // 将dp转为px
  const w = PixelRatio.getPixelSizeForLayoutSize(width);
  const h = PixelRatio.getPixelSizeForLayoutSize(clearHeight);

  // 竖屏时横向铺满
  if (designSize.width < designSize.height) {
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

export default zoomScreen;
