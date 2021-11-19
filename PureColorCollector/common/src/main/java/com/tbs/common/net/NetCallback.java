package com.tbs.common.net;

public interface NetCallback<T> {

    void  success(T t);

    void onFailure(String message);

}
