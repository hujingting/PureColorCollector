package com.tbs.common.model;

/**
 * @author guopeng
 * @ClassName: GreatP
 * @Description: TODO(一般性的通用返回结果)
 * @date 2014 2014年10月9日 上午11:40:20
 */
public class GeneralResultP extends BaseProtocol {

    private static final long serialVersionUID = 1L;
    private String url;

    private int is_share =-1;//0代表无共享用户，1代表有

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getIs_share() {
        return is_share;
    }

    public void setIs_share(int is_share) {
        this.is_share = is_share;
    }


}