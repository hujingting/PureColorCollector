package com.tbs.purecolorcollector.IService;



import com.tbs.common.model.GeneralResultP;

import io.reactivex.Flowable;
import io.reactivex.Observable;
import retrofit2.http.GET;

public interface IWanService {

    /**
     * 玩安卓评论
     *
     * @return
     */
    @GET("/wenda/comments/14500/json")
    Flowable<GeneralResultP> getComments();
}
