package com.tbs.purecolorcollector.controller

import com.tbs.common.net.NetCallback
import com.tbs.common.model.GeneralResultP
import com.tbs.common.net.BaseObserver
import com.tbs.common.net.RequestServiceUtil
import com.tbs.purecolorcollector.IService.IWanService
import io.reactivex.Flowable
import io.reactivex.schedulers.Schedulers
import io.reactivex.android.schedulers.AndroidSchedulers

object WanController {

    private fun <T> setSubscribeThread(flowable: Flowable<T>): Flowable<T>? {
        return flowable.subscribeOn(Schedulers.io())
            .unsubscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
    }

    //玩安卓评论
//    fun getComments(callback: NetCallback<GeneralResultP>?) {
//        val baseObserver = BaseObserver(callback)
//        RequestServiceUtil.createService(IWanService::class.java).comments
//            .subscribeOn(Schedulers.io())
//            .unsubscribeOn(Schedulers.io())
//            .observeOn(AndroidSchedulers.mainThread())
//            .subscribe(baseObserver)
//    }

    //玩安卓评论
    fun getComments() : Flowable<GeneralResultP?>? {
        return setSubscribeThread(RequestServiceUtil.createService(IWanService::class.java).comments)
    }
}