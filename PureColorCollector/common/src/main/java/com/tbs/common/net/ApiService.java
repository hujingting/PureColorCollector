package com.tbs.common.net;



import com.tbs.common.model.GeneralResultP;

import io.reactivex.Observable;
import retrofit2.http.GET;

public interface ApiService {

    /**
     * 退出登录
     *
     * @return
     */
    @GET("/wenda/comments/14500/json")
    Observable<GeneralResultP> getComments();
}
