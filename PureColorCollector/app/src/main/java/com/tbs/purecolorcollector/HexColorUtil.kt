package com.tbs.purecolorcollector

import java.util.regex.Matcher
import java.util.regex.Pattern

/**
 * author jingting
 * date : 2021/8/13下午5:07
 */
object HexColorUtil {

    private var pattern: Pattern? = null
    private var matcher: Matcher? = null

    private const val HEX_PATTERN = "^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"

    /**
     * Validate hex with regular expression
     * @param hex hex for validation
     * @return true valid hex, false invalid hex
     */
    fun validate(hex: String?): Boolean {

        if (pattern == null) {
            pattern = Pattern.compile(HEX_PATTERN)
        }

        matcher = pattern?.matcher(hex)
        return matcher!!.matches()
    }

}