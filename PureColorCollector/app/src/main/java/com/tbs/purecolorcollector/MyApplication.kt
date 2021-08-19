package com.tbs.purecolorcollector

import android.app.Application
import com.tbs.purecolorcollector.utils.PureColorUtils
import com.tbs.common.utils.ScreenUtils

/**
 * author jingting
 * date : 2021/8/13上午10:05
 */
class MyApplication : Application(){

    override fun onCreate() {
        super.onCreate()
        PureColorUtils.initialize(this)
        ScreenUtils.initScreen(this)
    }
}