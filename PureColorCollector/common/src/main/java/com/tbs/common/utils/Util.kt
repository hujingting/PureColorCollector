package com.tbs.common.utils

import java.util.regex.Pattern

/**
 * author jingting
 * date : 2021/11/2310:25 上午
 */
object Util {

    /**
     * 是否为标准的URL
     */
    fun isURL(url: String?): Boolean {
        var result = false
        val regex = "^(https?)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]"
        val pattern = Pattern.compile(regex)
        val matcher = pattern.matcher(url)
        val isMatch = matcher.matches()
        if (isMatch) {
            result = true
        }
        return result
    }

}