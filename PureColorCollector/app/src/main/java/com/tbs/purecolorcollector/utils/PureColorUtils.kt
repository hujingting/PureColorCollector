package com.tbs.purecolorcollector.utils

import android.annotation.SuppressLint
import android.content.Context
import android.os.Handler
import android.os.Looper

/**
 * author jingting
 * date : 2021/8/13上午10:23
 */
@SuppressLint("StaticFieldLeak")
object PureColorUtils {
    /**
     * 获取全局Context，在代码的任意位置都可以调用，随时都能获取到全局Context对象。
     *
     * @return 全局Context对象。
     */
    var context: Context? = null
        private set

    /**
     * 获取创建在主线程上的Handler对象。
     *
     * @return 创建在主线程上的Handler对象。
     */
    var handler: Handler? = null
        private set

    fun initialize(c: Context?) {
        context = c
        handler = Handler(Looper.getMainLooper())
    }
}