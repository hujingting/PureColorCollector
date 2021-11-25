package com.tbs.common.config;

import com.tbs.common.controller.IFunctionRouter;

/**
 * @author guopeng
 * @ClassName: AppConfig
 * @Description: TODO(产品配置类)
 * @date 2014 2014年10月23日 下午8:39:30
 */
public class AppConfig {

    private boolean debug = false;

    //友盟统计
    public String umengKey = "";
    //渠道
    public String channel = "";

    /**
     * 作用:产品功能路由
     */
    public IFunctionRouter appFunctionRouter = null;

    public boolean getDebug() {
        return this.debug;
    }

    public void setDebug(boolean debug) {
        this.debug = debug;
    }
}
