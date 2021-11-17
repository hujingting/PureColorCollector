package com.app.net;

import com.app.model.AppConfig;
import com.app.model.protocol.GeneralResultP;
import com.app.model.protocol.UpdateP;

import java.util.HashMap;

import io.reactivex.Flowable;
import io.reactivex.Observable;
import io.reactivex.Observer;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FieldMap;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;
import retrofit2.http.QueryMap;
import retrofit2.http.Url;

public interface ApiService {

    @FormUrlEncoded
    @POST("/api/devices/active")
    Observable<GeneralResultP> act(@FieldMap HashMap<String, String> map);

    @GET("/api/soft_versions/upgrade")
    Observable<UpdateP> checkUpdate(@QueryMap HashMap<String,String> map);
    @FormUrlEncoded
    @POST("/api/users/push_token")
    Observable<GeneralResultP>bindCid(@FieldMap HashMap<String, String> map);

    @FormUrlEncoded
    @POST("/api/users/client_status")
    Observable<GeneralResultP>clientStatus(@Field("client_status") int status);
    /**
     * 退出登录
     *
     * @return
     */
    @GET("/api/users/logout")
    Observable<GeneralResultP> loginOut();
}
