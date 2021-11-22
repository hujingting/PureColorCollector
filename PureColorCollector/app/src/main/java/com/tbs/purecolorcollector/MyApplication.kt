package com.tbs.purecolorcollector

import android.content.Context
import com.tbs.common.base.BaseApplication
import com.tbs.purecolorcollector.utils.PureColorUtils
import com.tbs.common.utils.ScreenUtils

/**
 * author jingting
 * date : 2021/8/13上午10:05
 */
class MyApplication : BaseApplication(){

    override fun onCreate() {
        super.onCreate()
        baseApplication = this
        PureColorUtils.initialize(this)
        ScreenUtils.initScreen(this)
    }

    companion object{
        private lateinit var baseApplication:MyApplication

        fun getContext(): Context {
            return baseApplication
        }
    }
}