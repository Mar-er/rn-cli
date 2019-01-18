package com.cjhms_app;

import android.app.Application;

import com.facebook.react.ReactApplication;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.engsshi.xlog.XLogPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.horcrux.svg.SvgPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import android.webkit.WebView;

import android.os.Environment;
import com.engsshi.xlog.XLogModule;
import com.engsshi.xlog.XLogSetting;

import com.cjhms_app.IsPadPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ExtraDimensionsPackage(),
            new XLogPackage(),
            new LinearGradientPackage(),
            new SvgPackage(),
            new VectorIconsPackage(),
            new SplashScreenReactPackage(),
            new OrientationPackage(),
            new RNGestureHandlerPackage(),
            new IsPadPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    WebView.setWebContentsDebuggingEnabled(true);

    final String appName = this.getString(R.string.app_name);
    final String logPath = Environment.getExternalStorageDirectory().getAbsolutePath() + '/' + appName + "/log";

    XLogSetting xLogSetting = XLogSetting.builder()
            .setLevel(XLogSetting.LEVEL_DEBUG)
            .setPath(logPath)
            .setCacheDir("")
            .setAppenderMode(XLogSetting.APPENDER_MODE_ASYNC)
            .setNamePrefix(appName)
            .setOpenConsoleLog(true)
            .build();
    XLogModule.init(xLogSetting);

    XLogModule.open(); //optional, for this, you can log before into RNView 
  }
}
