package com.app.net;

import com.app.model.protocol.BaseProtocol;
import com.app.util.MLog;

import io.reactivex.Observable;
import io.reactivex.Observer;
import io.reactivex.disposables.Disposable;

public  class Baseobserver<T extends BaseProtocol> implements Observer<T> {

    private NetCallback<T>mCallback;

    public Baseobserver(NetCallback<T> callback) {
        mCallback = callback;
    }

    @Override
    public void onSubscribe(Disposable d) {

    }
    @Override
    public void onNext(T t) {

        mCallback.success(t);
    }

    @Override
    public void onError(Throwable e) {
        mCallback.onFailure(RxExceptionUtil.exceptionHandler(e));

    }
    @Override
    public void onComplete() {

    }



}
