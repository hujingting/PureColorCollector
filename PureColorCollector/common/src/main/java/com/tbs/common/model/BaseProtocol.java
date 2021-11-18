package com.tbs.common.model;

import android.text.TextUtils;

/**
 * @author guopeng
 * @ClassName: BaseProtocol
 * @Description: TODO(所有服务器返回接口协议类的基类)
 * @date 2014 2014年9月18日 上午10:01:29
 */
public abstract class BaseProtocol extends Form {
    private static final long serialVersionUID = 1L;

    public final int ErrorNone = 0;
    public final int ErrorNeedLogin = -100;//需要重新登录
    public final int ErrorAccountLock = -101;//帐号被封
    public final int ErrorDeviceLock = -102;//设备被封
    public final int ErrorGeneral = -1;
    public final int ErrorActivited = 999;//已激活
    public final int ERROR_CODE_DIALOG = -1001; //-1001为弹框

    //	-1 代表失败 -2 红豆余额不足 -3 需要开通vip -4 选择消费红豆或者开通vip
    public final int ErrorNotEnough = -2;
    public final int ErrorPayVip = -3;
    public final int ErrorUseOrmosia = -4;
    public final int ErrorNeedPassword = -400; // 需要密码
    public final int ErrorNeedAuth = -5; // 实名认证
    public final int ErrorNeedUploadAvatar = -6;  // 需要头像

    public final int ErrorNeedRecordSignature = -3;//需要录制语音签名

    public final int ErrorNeedBindPhone = -9;//需要绑定手机号
    private String g_notify_channel;  //使用通信渠道 emchat 环信 agora_rtm 声网 为空则不广播后端推送websocket

    public final int ErrorAccountCancel = -7;//账号注销
    public final int ErrorBlocked = -19;//账户已被禁用，请联系客服申诉!!!


    private int error_code = -1;
    private String error_reason = "";
    private String error_url;
    private String pay_url;
    private int client_theme_version = -1;
    private int android_stable_version = -1;

    private int need_ormosia;

    private String blocked_url;// 账号注销申诉url

    public String getBlocked_url() {
        return blocked_url;
    }

    public void setBlocked_url(String blocked_url) {
        this.blocked_url = blocked_url;
    }

    public String getG_notify_channel() {
        return g_notify_channel;
    }

    public void setG_notify_channel(String g_notify_channel) {
        this.g_notify_channel = g_notify_channel;
    }

    public int getNeed_ormosia() {
        return need_ormosia;
    }

    public void setNeed_ormosia(int need_ormosia) {
        this.need_ormosia = need_ormosia;
    }

    private long now_at;//服务器当前时间

    private long service_time;//服务器当前时间

    public void setPay_url(String pay_url) {
        this.pay_url = pay_url;
    }

    public String getPay_url() {
        return pay_url;
    }

    private String tip_content; // 弹框提示原因 error_code为-1001是有此字段
    private String tip_url; //  弹框跳转地址 error_code为-1001是并且需要跳转的时候有此字段

    public String getTip_content() {
        return tip_content;
    }

    public void setTip_content(String tip_content) {
        this.tip_content = tip_content;
    }

    public String getTip_url() {
        return tip_url;
    }

    public void setTip_url(String tip_url) {
        this.tip_url = tip_url;
    }

    private String sid;

    public int getError_code() {
        return error_code;
    }

    public void setError_code(int error_code) {
        this.error_code = error_code;
    }

    public int getError() {
        return error_code;
    }

    public void setError(int error) {
        this.error_code = error;
    }

    public String getError_reason() {
        return error_reason;
    }

    public void setError_reason(String error_reason) {
        this.error_reason = error_reason;
    }

    public String getError_url() {
        return error_url;
    }

    public void setError_url(String error_url) {
        this.error_url = error_url;
    }

    public long getNow_at() {
        return now_at;
    }

    public void setNow_at(long now_at) {
        this.now_at = now_at;
    }

    public boolean isErrorNone() {
        return error_code == ErrorNone;
    }

    public boolean isActivited() {
        return error_code == ErrorActivited;
    }

    public int getClient_theme_version() {
        return client_theme_version;
    }

    public int getAndroid_stable_version() {

        return android_stable_version;
    }

    public void setAndroid_stable_version(int android_stable_version) {
        this.android_stable_version = android_stable_version;
    }

    public long getService_time() {
        return service_time;
    }

    public void setService_time(long service_time) {
        this.service_time = service_time;
    }


}


