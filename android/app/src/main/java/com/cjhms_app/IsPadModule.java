package com.cjhms_app;

import android.content.Context;
import android.content.res.Configuration;
import android.util.DisplayMetrics;
import android.view.Display;
import android.view.WindowManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class IsPadModule extends ReactContextBaseJavaModule {
	public IsPadModule(ReactApplicationContext reactContext) {
		super(reactContext);
	}

	@Override
	public String getName() {
		return "IsPadModule";
	}

	private boolean isTablet(Context context) {
    	return (context.getResources().getConfiguration().screenLayout
			& Configuration.SCREENLAYOUT_SIZE_MASK)
			>= Configuration.SCREENLAYOUT_SIZE_LARGE;
  	}
  
	private boolean isBigScreen() {
        WindowManager wm = (WindowManager) getCurrentActivity().getSystemService(Context.WINDOW_SERVICE);
        Display display = wm.getDefaultDisplay();
        DisplayMetrics dm = new DisplayMetrics();
        display.getMetrics(dm);
		double x = Math.pow(dm.widthPixels / dm.xdpi, 2);
		double y = Math.pow(dm.heightPixels / dm.ydpi,2);
        // 屏幕尺寸  
		double screenInches = Math.sqrt(x+y);
        // 大于6尺寸则为Pad  
        if (screenInches >= 6.0) {
            return true;
        }
        return false;
    }

	@ReactMethod
	public boolean isPad(Promise promise) {
		if (isTablet(getCurrentActivity())&&isBigScreen()) {
			promise.resolve(true);
			return true;
		}
		promise.resolve(false);
        return false;
	}

	@Override
	public boolean canOverrideExistingModule() {
		return true;
	}
}

