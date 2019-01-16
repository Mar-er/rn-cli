import { Platform, NativeModules } from 'react-native';

const { StatusBarManager } = NativeModules;

const statusHeight = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

export default {
  statusHeight,
};
