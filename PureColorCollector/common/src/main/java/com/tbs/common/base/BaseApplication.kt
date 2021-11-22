package com.tbs.common.base

import android.app.Application
import android.content.Context

/**
 * author jingting
 * date : 2021/8/13上午10:05
 */
open class BaseApplication : Application(){

    override fun onCreate() {
        super.onCreate()
        baseApplication = this
    }

    companion object{
        private lateinit var baseApplication: BaseApplication

        fun getContext(): Context {
            return baseApplication
        }
    }
}