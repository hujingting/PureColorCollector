package com.tbs.purecolorcollector.base

/**
 * author jingting
 * date : 2021/8/10下午3:36
 */
interface PermissionListener {

    fun onGranted()

    fun onDenied(deniedPermissions: List<String>)
}