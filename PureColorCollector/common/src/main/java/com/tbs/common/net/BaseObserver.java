package com.tbs.common.net;

import com.tbs.common.model.BaseProtocol;
import io.reactivex.Observer;
import io.reactivex.disposables.Disposable;

public class BaseObserver<T extends BaseProtocol> implements Observer<T> {

    private NetCallback<T> mCallback;

    public BaseObserver(NetCallback<T> callback) {
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
