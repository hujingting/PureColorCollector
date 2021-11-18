package com.tbs.common.config;

import android.app.Activity;
import android.app.Application;
import android.app.Service;

/**
 * @author guopeng
 * @ClassName: AppConfig
 * @Description: TODO(产品配置类)
 * @date 2014 2014年10月23日 下午8:39:30
 */
public class AppConfig {
    //产品标识
    public static String xCode = "";

    //打包时间
    public String buildAt = "";
    //服务器IP,base64编码
    public  String ip = "";
    public String ip2 = "";
    public String jsServerAddress;
    public String exclusive_ip = "";

    public String imagesAddress;
    //后台service类
    public Class<?> service = null;
    //后台service类
    public Class<? extends Service> gt_service = null;
    //接收来自个推的消息
//    public Class<? extends GTIntentService> pushService = null;
    // * 为了让推送服务在部分主流机型上更稳定运行，从2.9.5.0版本开始，个推支持第三方应用配置使用自定义Service来作为推送服务运行的载体。* 解决部分手机无法获取clientid从而无法收到推送问题
    public Class<? extends Service> msgPushService = null;
    //快捷方式启动类名
    public String shortcutClassName = "";
    //应用图标资源ID
    public int iconResourceId = -1;
    //友盟统计
    public String umengKey = "";
    //渠道
    public String channel = "";
    //支持的SDK
    public String sdks = "";//mm,alipay
    //用户信息的Key
    public static String userInfoDetailKey = "userinfodetailkey";


    public Class<? extends Activity> startActivity = null;

    public Class<? extends Activity> weexActivity = null;

    public Class<? extends Activity> mainActivity = null;

    public int notificationCount = 1;

    public int notificationIcon = -1;

    public int notificationImg = -1;
    /**
     * 是否解析json,根据json文件显示tab
     */
    private boolean isDynamicTab = false;

    public boolean isDynamicTab() {
        return isDynamicTab;
    }

    public void setDynamicTab(boolean dynamicTab) {
        isDynamicTab = dynamicTab;
    }

    /**
     * 作用:产品功能路由
     */
//    public IFunctionRouter appFunctionRouter = null;
    /**
     * 地理经纬度
     */
    public String latitude_longitude = "";
    //是否使用其它定位SDK
    public boolean useOtherLocationSDK = false;
    /*
     * api版本
     */
    public String api_version = "";

    public String content_types = "";//支持的消息类型

    public int version_code = 0;
    public String version_name = "";

    public QQConfig qqConfig;//qq登录需要配置信息
    public WeChatConfig weChatConfig;//微信需要配置信息

    //debug模式
    private boolean debug = false;
    private Application application = null;

    private boolean useZip = true;

    public String themeVersion = "";

    public String mainPage = "";
    public boolean isColdBoot = false;//是否为冷启动
    public boolean httpdns = false;

    public static boolean isEncryption = true;    //是否使用新的加密方式

    public final static String app_update_url = "";//软件升级地址

    public static class QQConfig {
        public String appid;

        public QQConfig(String appid) {
            this.appid = appid;
        }
    }

    public static class WeChatConfig {
        public WeChatConfig(String appid, String secret) {
            this.appid = appid;
            this.secret = secret;


        }

        public String appid;
        public String secret;
    }

    public AppConfig(Application application) {
        this.application = application;
//        version_code = Util.getVersionCode(application.getApplicationContext());
//        version_name = Util.getVersionName(application.getApplicationContext());
    }

    public boolean getDebug() {
        return this.debug;
    }

    public void setDebug(boolean debug) {
        this.debug = debug;

//      这么写只能保证 打签名包不会有一些环信之类的发送提示  但是不能用 AppConst.debug 控制了
//		if (application != null && this.debug) {
//			try {
//				ApplicationInfo info = application.getApplicationInfo();
//
//				this.debug = (info.flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
//
//			} catch (Exception e) {
//			}
//		}
    }

    public void setUseZip(boolean use) {
        this.useZip = use;
    }

    public boolean isUseZip() {
        return this.useZip;
    }
}
