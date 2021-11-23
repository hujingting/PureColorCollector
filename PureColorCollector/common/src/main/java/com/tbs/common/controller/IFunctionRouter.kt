/**
 * BussinessCoreLib
 * com.app.yuanfen.activity.iview
 * IFunctionRouter.java
 *
 *
 * guopeng 创建于 2014年11月21日-上午11:16:14
 */
package com.tbs.common.controller

import android.content.Context
import com.tbs.common.model.GeneralResultP
import com.tbs.common.net.NetCallback

/**
 * IFunctionRouter
 *
 * 功能:全局功能路由接口，由各产品来实现
 *
 * guopeng 创建于 2014年11月21日 上午11:16:14
 *
 * @version 1.0.0
 */
interface IFunctionRouter {
    fun beforeAppStart()
    fun afterAppStart()
    fun appExit()
    fun checkUpdate(isShow: Boolean, callback: RequestDataCallback<GeneralResultP?>?)
    fun ACT(callBack: RequestDataCallback<GeneralResultP?>?)
    fun getPayment(url: String?, callback: RequestDataCallback<GeneralResultP?>?)
    fun bindCid(push_token: String?, token_from: String?)

    /**
     *
     * 功能:下载
     *
     * @param url
     * @param des
     * @param iconUrl
     * @param autoOpen
     * @throws
     * @since 1.0.0
     * <P>guopeng 创建于 2014年12月2日 下午5:38:58</P>
     * <P>修改：修改人-时间-修改内容</P>
     */
    fun down(url: String?, des: String?, iconUrl: String?, autoOpen: Boolean)

    /**
     *
     * 功能:打开浏览器
     *
     * @param url
     * @throws
     * @since 1.0.0
     * <P>guopeng 创建于 2014年12月2日 下午5:39:06</P>
     * <P>修改：修改人-时间-修改内容</P>
     */
    fun openBrowser(url: String?)

    /**
     *
     * 功能:webView url loading
     *
     * @param url
     * @return
     * @throws
     * @since 1.0.0
     * <P>guopeng 创建于 2014年12月2日 下午5:39:16</P>
     * <P>修改：修改人-时间-修改内容</P>
     */
    fun shouldOverrideUrlLoading(url: String?): Boolean

    /**
     *
     * 功能:处理URL，true：可以继续，FALSE：不可以继续
     *
     * @param url
     * @return
     * @throws
     * @since 1.0.0
     * <P>guopeng 创建于 2014年12月31日 下午7:49:09</P>
     * <P>修改：修改人-时间-修改内容</P>
     */
    fun handleUrl(url: String?): Boolean

    /**
     *
     * 功能:打开内置的webview
     *
     * @param url
     * @throws
     * @since 1.0.0
     * <P>guopeng 创建于 2014年12月3日 下午5:38:40</P>
     * <P>修改：修改人-时间-修改内容</P>
     */
    fun openWebView(url: String?, isHttp: Boolean)

    /**
     *
     * 功能:打电话
     *
     * @param phoneNumber
     * @throws
     * @since 1.0.0
     * <P>guopeng 创建于 2014年12月27日 下午8:48:11</P>
     * <P>修改：修改人-时间-修改内容</P>
     */
    fun tel(phoneNumber: String?)

    /**
     *
     * 功能:发短信
     *
     * @param pn
     * @param content
     * @throws
     * @since 1.0.0
     * <P>guopeng 创建于 2014年12月30日 上午11:36:56</P>
     * <P>修改：修改人-时间-修改内容</P>
     */
    fun sendSMS(pn: String?, content: String?)

    /**
     *
     * 功能:WEBVIEW内容过滤
     *
     * @param html
     * @throws
     * @since 1.0.0
     * <P>guopeng 创建于 2014年12月30日 下午12:13:58</P>
     * <P>修改：修改人-时间-修改内容</P>
     */
    fun webViewContent(html: String?)
    fun openWeex(uri: String?)
    fun openWeex(uri: String?, backTo: String?)
    fun openWeex(uri: String?, backTo: String?, param: String?, closeCurrentPage: Boolean)
    fun openWeex(
        uri: String?,
        backTo: String?,
        param: String?,
        closeCurrentPage: Boolean,
        isOpenNewTask: Boolean
    )

    fun interceptClickWeb(action: String?, uid: String?): Boolean
    fun updateSid(sid: String?)

    //	String getSid();
    fun share(share: GeneralResultP?)
    fun setLoginState(isLogin: Boolean)

    //支付sdk
    fun startAlipay(from: GeneralResultP?): Boolean
    fun startAlipaySignPay(from: GeneralResultP?): Boolean
    fun startWXPay(from: GeneralResultP?): Boolean
    fun startBalancePay(from: GeneralResultP?): Boolean

    /**
     * 内部提示
     *
     * @param object
     */
    fun showTips(`object`: Any?)

    /**
     * 账号下线
     *
     * @param sid
     */
    fun accountOffline(sid: String?)

    /**
     * 需要登录
     *
     * @param sid
     */
    fun needLogin(sid: String?, error_url: String?)

    /**
     * 根据key 获取配置信息
     *
     * @param key
     * @return
     */
    fun getConfigByKey(key: String?)

    /**
     * 账号锁住
     */
    fun accountLock()

    /**
     * 需要付费
     */
    fun needPay(payUrl: String?, content: String?)
    fun needPay(payUrl: String?, content: String?, callBack: NetCallback<*>?)

    /**
     * 设备锁住
     */
    fun deviceLock()

    /**
     * webview  302 重定向跳转
     *
     * @param url
     */
    fun webviewRedirect(url: String?)

    /**
     * 打开apk
     * @param ctx
     * @param path
     */
    fun openAPK(ctx: Context?, path: String?)

    /**
     * 获取接口加密密钥
     */
    fun obtainKeyWords(): String?

    /**
     * 绑定手机号
     */
    fun bindPhone(content: String?)
    fun receivePushMsg(content: String?)
    fun requestError(code: Int)
    fun requestError(code: Int, baseProtocol: GeneralResultP?)
}