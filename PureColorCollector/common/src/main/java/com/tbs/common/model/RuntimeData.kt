package com.tbs.common.model

import com.tbs.common.config.AppConfig

/**
 * @author guopeng
 * @ClassName: RuntimeData
 * @Description: (存储运行时数据 ，比如当前用户信息 ， SESSION ，APP上下文Context)
 */
object RuntimeData {
    /**
     * 应用配置信息
     */
    internal var appConfig: AppConfig? = null

    /**
     * @Description: (在程序开始时调用 ，  初始化图片缓存)
     */
    fun init(appConfig: AppConfig?) {

    }
}