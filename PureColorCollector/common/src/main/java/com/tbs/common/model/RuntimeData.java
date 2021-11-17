package com.app.model;

import android.app.Activity;
import android.content.Context;
import android.text.TextUtils;
import android.util.Base64;

import com.app.controller.RequestDataCallback;
import com.app.model.net.HTTPCaller;
import com.app.model.net.Header;
import com.app.model.net.HttpConfig;
import com.app.model.protocol.ThemeConfig;
import com.app.util.FileUtil;
import com.app.util.MLog;
import com.app.util.MMKVUtils;
import com.app.util.SPManager;
import com.app.util.StorageUtil;
import com.app.util.Util;
import com.app.widget.NetCallback;
import com.tencent.mmkv.MMKV;
import com.umeng.analytics.MobclickAgent;
import com.umeng.commonsdk.UMConfigure;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;


/**
 * @author guopeng
 * @ClassName: RuntimeData
 * @Description: TODO(存储运行时数据 ， 比如当前用户信息 ， SESSION ， APP上下文Context)
 * @date 2014 2014年9月18日 下午3:21:29
 */
public class RuntimeData {
    private static RuntimeData _instance = null;
    /**
     * ApplicationContext
     */
    protected Context ctx = null;
    /**
     * 当前使用的服务器域名或IP
     */
    private String currentServerUrl = "";
    private String currentServerUrl2 = "";
    //通用字段
//	protected List<NameValuePair> commonField=null;

    protected HashMap<String, NetCallback> netCallbacks = null;

    protected Header[] headers = null;
    /**
     * @Fields currentActivity : TODO(当前界面)
     */
    private Activity currentActivity = null;
    /**
     * 应用配置信息
     */
    protected AppConfig appConfig = null;


    private Map<String, Boolean> activityManagerMap = null;//防止activity跳转慢时，用户连续点击出现多个页面的情况

    public boolean isInit = false;

    public static String cid = "";
    private String cid_from = "";
    private String sid = "";

    //-------------------------------------------
    public String latitude = "";
    public String longitude = "";
    public boolean isNetUsable = true;
    public boolean isUpdatingTemplate = false;
    private boolean isAppFirstRun = true;
    /**
     * 应用是否在后台
     */
    private boolean isBack = false;
    private String trace = "";
    private String app_type = "native";
    private boolean nav_type = false;

    protected String[] cityProvince = null;

    private boolean hasNewVersion;  //是否有新版本

    private boolean isShowUpdateDialog; //是否显示了更新弹框

    private int android_stable_version = -1;

    /**
     * 模板解析配置
     */
    private ThemeConfig themeConfig = null;

    private boolean isApplySystemBar; //沉浸栏


    //-------------------------------------------------------------------------------------------


    public boolean isShowUpdateDialog() {
        return isShowUpdateDialog;
    }

    public void setShowUpdateDialog(boolean showUpdateDialog) {
        isShowUpdateDialog = showUpdateDialog;
    }

    public boolean isHasNewVersion() {
        return hasNewVersion;
    }

    public void setHasNewVersion(boolean hasNewVersion) {
        this.hasNewVersion = hasNewVersion;
    }

    public boolean isApplySystemBar() {
        return isApplySystemBar;
    }

    public void setApplySystemBar(boolean applySystemBar) {
        isApplySystemBar = applySystemBar;
    }

//	private Map<String,ProtocolUrlB> protocolUrlMap;

    public static RuntimeData getInstance() {
        if (_instance == null) {
            _instance = new RuntimeData();
        }
        return _instance;
    }

    public static void setInstance(RuntimeData runtimeData) {
        _instance = runtimeData;
    }


    public RuntimeData() {

    }

    /**
     * @param @param ctx    设定文件
     * @return void    返回类型
     * @throws
     * @Title: init
     * @Description: TODO(在程序开始时调用 ， 主要用于缓存ApplicationContext供后续使用 、 初始化图片缓存)
     */
    public void init(Context ctx, AppConfig appConfig) {
        if (this.ctx == null) {
            if (ctx instanceof Activity) {
                this.ctx = ctx.getApplicationContext();
            } else {
                this.ctx = ctx;
            }
            this.appConfig = appConfig;
            if (this.appConfig != null && appConfig.appFunctionRouter != null) {

                appConfig.appFunctionRouter.beforeAppStart();

            }

            if (TextUtils.isEmpty(this.appConfig.channel)) {
                this.appConfig.channel = this.getFR();
            }
            //第三方统计
            initStatistics(ctx);
            StorageUtil.init(ctx);
            initLazy();
        }
    }

    public void initLazy() {
        synchronized (trace) {
            if (isInit) {
                return;
            }
            isInit = true;
        }
//        NUtil.initutil();
        checkNetUsable();

        getSid();
        getCid();
        getCidFrom();

        if (appConfig == null) {
            MLog.w("XX", "initLazy:appConfig为null");
            return;
        }
        //设置app私有文件夹路径
        FileUtil.setFolderName(appConfig.xCode);

        appConfig.themeVersion = getThemeVersion();


        MLog.debug = appConfig.getDebug();

        HttpConfig httpConfig = new HttpConfig();
        httpConfig.setDebug(appConfig.getDebug());
        HTTPCaller.Instance().setContext(this.ctx).setHttpConfig(httpConfig);

        initServerUrl();
        initCommonField();
        initHeaders();

    }


    private RequestDataCallback<double[]> callback = new RequestDataCallback<double[]>() {
        @Override
        public void dataCallback(double[] data) {
            updateLocation(data);
        }
    };

    public void setSid(String sid) {
        if (TextUtils.isEmpty(sid)) {
            return;
        }
        this.sid = sid;

        SPManager.getInstance().putString("sid", sid);
        HTTPCaller.Instance().updateCommonField("sid", sid);
    }

    public void setBack(boolean isBack) {
        this.isBack = isBack;
    }

    public boolean getBack() {
        return this.isBack;
    }

    /**
     * <p> 更新header信息</>
     *
     * @param key
     * @param value
     */
    public void updataHeaderFiled(String key, String value) {

    }

    public String getSid() {
        if (TextUtils.isEmpty(sid) && getContext() != null) {
            sid = SPManager.getInstance().getString("sid");
        }
        return sid;
    }

//    public MobclickAgent.UMAnalyticsConfig um;

    public void setAct(boolean act) {
        SPManager.getInstance().putBoolean("activity", act);
    }

    public boolean isAct() {
        return SPManager.getInstance().getBoolean("activity");//激活信息
    }

    /**
     * 初始化common库
     * 参数1:上下文，不能为空
     * 参数2:友盟 app key
     * 参数3:友盟 channel
     * 参数4:设备类型，UMConfigure.DEVICE_TYPE_PHONE为手机、UMConfigure.DEVICE_TYPE_BOX为盒子，默认为手机
     * 参数5:Push推送业务的secret
     */
    private void initStatistics(Context ctx) {
        if (!TextUtils.isEmpty(appConfig.umengKey) && !TextUtils.isEmpty(appConfig.channel)) {
            UMConfigure.setLogEnabled(appConfig.getDebug());
            UMConfigure.preInit(ctx, appConfig.umengKey, appConfig.channel);
            MobclickAgent.setPageCollectionMode(MobclickAgent.PageMode.AUTO);
            if (MMKVUtils.getBooleanData("AGREE_APP",false)) {
                initUMengConfig(ctx);
            }
        }
    }

    //正式初始化友盟
    public void initUMengConfig(Context ctx) {
        if (!TextUtils.isEmpty(appConfig.umengKey) && !TextUtils.isEmpty(appConfig.channel)) {
            UMConfigure.init(ctx, appConfig.umengKey, appConfig.channel, UMConfigure.DEVICE_TYPE_PHONE, "");
        }
    }


    public Context getContext() {
        return this.ctx;
    }

    public void setContext(Context context) {
        this.ctx = context;
    }

    //初始化服务器地址
    private void initServerUrl() {
        String url = Util.getUrl(ctx);
        if (Util.isURL(url)) {//优先使用配的URL
            this.currentServerUrl = url;
        } else {
            this.currentServerUrl = appConfig.ip;
            this.currentServerUrl2 = appConfig.ip2;
        }
    }

    public boolean initServerUrl(String url) {
        MLog.d("XX", "设置新域名:" + url);
        if (Util.isURL(url)) {  //URL
            this.currentServerUrl = url;
            return true;
        }
        return false;
    }

    /**
     * 获取服务器URL
     *
     * @param @param  url
     * @param @return 设定文件
     * @return String    返回类型
     * @throws
     * @Title: getURL
     * @Description: TODO(获取服务器URL)
     */
    public String getURL(String url) {
        if (TextUtils.isEmpty(url))
            return null;
//		MLog.i(MLog.ANSEN,"是否带了域名:"+Util.isUrl(url));
        if (!url.contains("https://") && !url.contains("http://")) {
            if (url.startsWith("/")) {
                url = this.currentServerUrl + url;
            } else {
                url = this.currentServerUrl + "/" + url;
            }
        }
        return url;
    }

    public String getURL2(String url) {
        if (TextUtils.isEmpty(url))
            return null;
//		MLog.i(MLog.ANSEN,"是否带了域名:"+Util.isUrl(url));
        if (!url.contains("https://") && !url.contains("http://")) {
            if (url.startsWith("/")) {
                url = this.currentServerUrl2 + url;
            } else {
                url = this.currentServerUrl2 + "/" + url;
            }
        }
        return url;
    }

    public String getExclusiveURL(String url) {
        if (TextUtils.isEmpty(url) || TextUtils.isEmpty(appConfig.exclusive_ip))
            return null;
        if (!url.contains("https://") && !url.contains("http://")) {
            if (url.startsWith("/")) {
                url = new String(Base64.decode(appConfig.exclusive_ip, Base64.DEFAULT)) + url;
            } else {
                url = new String(Base64.decode(appConfig.exclusive_ip, Base64.DEFAULT)) + "/" + url;
            }
        }
        return url;
    }

    /**
     * @param url
     * @param isHttp true:http协议 false:https协议
     * @return
     */
    public String getURL(String url, boolean isHttp) {
        if (TextUtils.isEmpty(url))
            return null;
//		MLog.i(MLog.ANSEN,"是否带了域名:"+Util.isUrl(url));
        if (!url.contains("https://") && !url.contains("http://")) {
            if (Util.isUrl(url)) {//有域名但没有http/https开头
                String header = isHttp ? "http://" : "https://";
                url = header + url;
            } else {//没有域名
                if (url.startsWith("/")) {
                    url = this.currentServerUrl + url;
                } else {
                    url = this.currentServerUrl + "/" + url;
                }
            }
        }
        return url;
    }


//	public String getOpenWeexUrlByClientUrl(String clientUrlStr){
//		ClientUrl clientUrl=new ClientUrl(clientUrlStr);
//		ProtocolUrlB protocolUrlB=getProtocolUrl(clientUrl.getAppUrl());
//		MLog.d("ansen","getOpenWeexUrlByClientUrl:  protocolUrlB:"+protocolUrlB);
//		if(protocolUrlB!=null){//有对应的js地址
//			if(protocolUrlB.getJs_url().startsWith("url://")){
//				return protocolUrlB.getJs_url();
//			}if(protocolUrlB.getJs_url().startsWith("js://")){
//					return protocolUrlB.getJs_url();
//			}else{
//				String url="";
//				if (protocolUrlB.getJs_url().startsWith("/")){
//					url=RuntimeData.getInstance().getAppConfig().jsServerAddress+protocolUrlB.getJs_url();
//				}else{
//					url=RuntimeData.getInstance().getAppConfig().jsServerAddress+"/"+protocolUrlB.getJs_url();
//				}
//				MLog.d("XX","getOpenWeexUrlByClientUrl: "+url);
//				if(!TextUtils.isEmpty(clientUrl.getParamStr())){
//					url+="?"+clientUrl.getParamStr();
//				}
//				return url;
//			}
//		}
//		return "";
//	}

    public String getCurrentServerUrl() {
        return currentServerUrl;
    }

    public void initCommonField() {
        if (!TextUtils.isEmpty(this.latitude)) {
            HTTPCaller.Instance().addCommonField("lat", this.latitude);
        }
        if (!TextUtils.isEmpty(this.longitude)) {
            HTTPCaller.Instance().addCommonField("lon", this.longitude);
        }
        HTTPCaller.Instance().addCommonField("net", Util.getAPNType(ctx));
        if (!TextUtils.isEmpty(sid)) {
            HTTPCaller.Instance().addCommonField("sid", sid);
        }
        HTTPCaller.Instance().addCommonField("verc", String.valueOf(Util.getVersionCode(ctx)));
        //不变的
        HTTPCaller.Instance().addCommonField("pf", "android");
        HTTPCaller.Instance().addCommonField("pf_ver", android.os.Build.VERSION.RELEASE);
        HTTPCaller.Instance().addCommonField("man", android.os.Build.MANUFACTURER);
        HTTPCaller.Instance().addCommonField("mod", android.os.Build.MODEL);
        HTTPCaller.Instance().addCommonField("ver", Util.getVersionName(ctx));
        HTTPCaller.Instance().addCommonField("fr", getFR());
        HTTPCaller.Instance().addCommonField("an", appConfig.api_version);//版本协议号
        HTTPCaller.Instance().addCommonField("code", appConfig.xCode);
        //if(weexAdapter!=null)
        HTTPCaller.Instance().addCommonField("tv", appConfig.themeVersion);
        //时区 string, 例如 +8
        HTTPCaller.Instance().addCommonField("tz", Util.getGMTTimeZone());
        //lang 语言
        if (ctx != null) {
            HTTPCaller.Instance().addCommonField("lang", getContext().getResources().getConfiguration().locale.getLanguage());
        }
        if (!TextUtils.isEmpty(this.trace)) {
            HTTPCaller.Instance().addCommonField("tn", this.trace);
        }
    }


    public void updateLocation(double[] location) {
        this.latitude = location[0] + "";
        this.longitude = location[1] + "";

        HTTPCaller.Instance().updateCommonField("lat", latitude);
        HTTPCaller.Instance().updateCommonField("lon", longitude);
    }

    public boolean hasLocation() {
        if (TextUtils.isEmpty(latitude) || TextUtils.isEmpty(longitude)) {
            return false;
        }
        return true;
    }

    public void netChange() {
        HTTPCaller.Instance().updateCommonField("net", Util.getAPNType(ctx));
    }

    //取FR
    public String getFR() {
        String fr = Util.getChannel(ctx);
        if (TextUtils.isEmpty(fr)) {
            fr = "an_ttxxlsy_175";
        }
        return fr;
    }

    public AppConfig getAppConfig() {
        return appConfig;
    }

    public boolean getLoginStatus() {
        return SPManager.getInstance().getBoolean(CoreConst.LOGIN);
    }

    public void setLoginStatus(boolean login) {
        SPManager.getInstance().putBoolean(CoreConst.LOGIN, login);
        if (login) {//重打开用户消息数据库

        } else {//登出

        }
    }

    public void setUserId(String userId) {
        SPManager.getInstance().putString(CoreConst.USER_ID, userId);
    }

    public String getUserId() {
        return SPManager.getInstance().getString(CoreConst.USER_ID);
    }


    public Activity getCurrentActivity() {
        return currentActivity;
    }

    public void setCurrentActivity(Activity currentActivity) {
        this.currentActivity = currentActivity;
    }

    public String getCommonFieldString() {
        return HTTPCaller.Instance().getCommonFieldString();
    }

    public String getCid() {
        if (TextUtils.isEmpty(cid)) {
            cid = SPManager.getInstance().getString("cid");
        }
        return cid;
    }

    public String getCidFrom() {
        if (TextUtils.isEmpty(cid_from)) {
            cid_from = SPManager.getInstance().getString("cid_from");
        }
        return this.cid_from;
    }

    public void setCid(String cid, String cid_from) {
        this.cid = cid;
        this.cid_from = cid_from;

        SPManager.getInstance().putString("cid", cid);
        SPManager.getInstance().putString("cid_from", cid_from);

    }

    public void setApiVersion(String api_version) {
        this.appConfig.api_version = api_version;
        HTTPCaller.Instance().updateCommonField("an", api_version);
    }

    public void setThemeVersion(String tv) {
        if (!TextUtils.isEmpty(tv)) {
            SPManager.getInstance().putString("tv", tv);
            HTTPCaller.Instance().updateCommonField("tv", tv);
            appConfig.themeVersion = tv;
        }
    }

    public String getThemeVersion() {
        String tv = SPManager.getInstance().getString("tv");
        if (tv != null && !TextUtils.isEmpty(tv)) {
            return tv;
        }
        return "" + 0;
    }

    public void setTn(String tn) {
        if (!TextUtils.isEmpty(tn)) {
            HTTPCaller.Instance().updateCommonField("tn", tn);
            this.trace = tn;
        }
    }

    public void exit() {
        this.currentActivity = null;
        this.appConfig.isColdBoot = false;
        this.appConfig.appFunctionRouter.appExit();
    }


    public Header[] getHeaders() {
        return headers;
    }

    public void initHeaders() {

    }

    public void checkNetUsable() {
        this.isNetUsable = Util.isNetworkAvailable(this.ctx);
//		MLog.e("网络可用："+this.isNetUsable);
        if (this.isNetUsable) {
            if (netCallbacks != null) {
                Iterator iter = this.netCallbacks.entrySet().iterator();
                while (iter.hasNext()) {
                    Map.Entry entry = (Map.Entry) iter.next();
                    Object val = entry.getValue();
                    if (val instanceof NetCallback) {
                        ((NetCallback) val).netCallback();
                    }
                }
            }
        }
    }

    public void registerNetCallback(String key, NetCallback callback) {
        if (netCallbacks == null) {
            netCallbacks = new HashMap<String, NetCallback>();
        }
        netCallbacks.put(key, callback);
    }

    public boolean isAppFirstRun() {

        return !SPManager.getInstance().getBoolean("first_run");
    }

    public void setAppFirstRun(boolean appFirstRun) {
        SPManager.getInstance().putBoolean("first_run", appFirstRun);
    }


    public Boolean activityFlagPush(String url) {
        if (activityManagerMap == null) {
            activityManagerMap = new HashMap<>();
        }

        if (activityManagerMap.containsKey(url)) {//如果存在,activity 正在打开
            return true;
        } else {
            activityManagerMap.put(url, true);
            return false;
        }
    }

    public Boolean activityFlagPop(String url) {
        MLog.e("cody", "" + url);
        if (activityManagerMap != null) {
            activityManagerMap.remove(url);
        }
        return false;
    }

    public String getApp_type() {
        return app_type;
    }

    public boolean isNav_type() {
        return nav_type;
    }

    public void setThemeConfig(ThemeConfig themeConfig) {
        if (themeConfig != null) {
            this.app_type = themeConfig.getApp_type();
            this.nav_type = themeConfig.isNav_type();
            this.themeConfig = themeConfig;
        }
    }

    public ThemeConfig getThemeConfig() {
        return this.themeConfig;
    }

    public static void set_instance(RuntimeData _instance) {
        RuntimeData._instance = _instance;
    }


    public void updateCityProvince(String[] city_and_province) {
        cityProvince = city_and_province;
    }

    public String[] getCityProvince() {
        return cityProvince;
    }

    public void setAndroid_stable_version(int android_stable_version) {

        this.android_stable_version = android_stable_version;
        if (getContext() != null) {
            SPManager.getInstance().putInt("android_stable_version", android_stable_version);
        }
    }

    public int getAndroid_stable_version() {


        return this.android_stable_version;


    }

    public boolean isCheckVersion() {
        if (ctx == null) {
            MLog.d(getClass().getSimpleName().toString(), "ctx==null");
            return true;
        }

        if (this.android_stable_version < 0) {
            this.android_stable_version = SPManager.getInstance().getInt("android_stable_version");
        }

        if (Util.getVersionCode(ctx) > android_stable_version) {
            MLog.d(getClass().getSimpleName().toString(), "android_stable_version==" + android_stable_version);
            return true;
        }
        return false;

    }


}
