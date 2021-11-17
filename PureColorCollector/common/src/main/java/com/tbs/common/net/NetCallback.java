package com.app.net;

public interface NetCallback<T> {

    void  success(T t);
    void onFailure(String message);

}
