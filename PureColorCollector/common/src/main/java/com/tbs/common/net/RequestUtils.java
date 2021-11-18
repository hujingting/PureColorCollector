package com.tbs.common.net;


import com.tbs.common.model.GeneralResultP;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.schedulers.Schedulers;

public class RequestUtils {

//    public static void act(NetCallback<GeneralResultP> callback, HashMap<String,String> map) {
//
//        RequestServiceUtil.createService(ApiService.class).act(map)
//                .compose(RxHelper.observableIO2Main(RuntimeData.getInstance().getContext()))
//                .subscribe(new Baseobserver<>(callback));
////                .subscribeOn(Schedulers.io())
////                .unsubscribeOn(Schedulers.io())
////                .observeOn(AndroidSchedulers.mainThread())
////                .subscribe(new Baseobserver<>(callback));
//
//    }
//
////    public static void checkUpdate(NetCallback<UpdateP> callback,HashMap<String,String>map){
////        RequestServiceUtil.createService(ApiService.class).checkUpdate(map)
////                .subscribeOn(Schedulers.io())
////                .unsubscribeOn(Schedulers.io())
////                .observeOn(AndroidSchedulers.mainThread())
////                .subscribe(new Baseobserver<>(callback));
////    }
//
//    public static void bindCid(NetCallback<GeneralResultP> callback, HashMap<String,String> map){
//
//        RequestServiceUtil.createService(ApiService.class).bindCid(map)
//
//                .subscribeOn(Schedulers.io())
//                .unsubscribeOn(Schedulers.io())
//                .observeOn(AndroidSchedulers.mainThread())
//                .subscribe(new Baseobserver<>(callback));
//    }
//
//    public static void clientStatus(int status){
//       GeneralNetCallBack<GeneralResultP>callBack = new GeneralNetCallBack<>();
//       Baseobserver<GeneralResultP> baseobserver = new Baseobserver<GeneralResultP>(callBack);
//        RequestServiceUtil.createService(ApiService.class).clientStatus(status)
//                .subscribeOn(Schedulers.io())
//                .unsubscribeOn(Schedulers.io())
//                .observeOn(AndroidSchedulers.mainThread())
//                .subscribe(baseobserver);
//
//    }
//
//    public static <T>Flowable<T> sendRequest(Flowable<T> flowable){
//        return flowable.subscribeOn(Schedulers.io())
//                .unsubscribeOn(Schedulers.io())
//                .observeOn(AndroidSchedulers.mainThread());
//    }
//
    //退出登录
    public static void getComments(NetCallback<GeneralResultP> callback){
        Baseobserver<GeneralResultP> baseobserver = new Baseobserver<GeneralResultP>(callback);
        RequestServiceUtil.createService(ApiService.class).getComments()
                .subscribeOn(Schedulers.io())
                .unsubscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(baseobserver);
    }
}
