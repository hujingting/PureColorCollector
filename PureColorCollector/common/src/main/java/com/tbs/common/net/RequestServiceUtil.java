package com.tbs.common.net;

import android.text.TextUtils;


import java.security.cert.CertificateException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import javax.net.ssl.X509TrustManager;
import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * @author liujinxian
 */
public class RequestServiceUtil {

    private static final int DEFAULT_TIMEOUT = 10;
    private static final Map<String, Retrofit> baseUrl2retrofit = new HashMap<>();
    private static final String base_url = "https://www.wanandroid.com";//玩安卓域名

    public static synchronized <S> S createService(Class<S> serviceClass) {
        return createService(serviceClass, null);
    }

    public static <S> S createService(Class<S> serviceClass, String baseUrl) {
        Retrofit retrofit;
        synchronized (baseUrl2retrofit) {
            retrofit = baseUrl2retrofit.get(baseUrl);
            if (retrofit == null) {
//                CommonInterceptor interceptor = new CommonInterceptor();
                HashMap<String, String> map = new HashMap<>();
                OkHttpClient.Builder clientBuilder = new OkHttpClient.Builder()
                        .connectTimeout(DEFAULT_TIMEOUT, TimeUnit.SECONDS)
                        .readTimeout(DEFAULT_TIMEOUT, TimeUnit.SECONDS);
                Retrofit.Builder retrofitBuilder = new Retrofit.Builder()
                        .addConverterFactory(GsonConverterFactory.create())
                        .addCallAdapterFactory(RxJava2CallAdapterFactory.create());

                if (!TextUtils.isEmpty(baseUrl)) {
                    retrofitBuilder.baseUrl(baseUrl);
                } else {
                    retrofitBuilder.baseUrl(base_url);
                }
                clientBuilder.interceptors().clear();
//                clientBuilder.interceptors().add(interceptor);

                //定义一个信任所有证书的TrustManager
                final X509TrustManager trustAllCert = new X509TrustManager() {
                    @Override
                    public void checkClientTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {

                    }

                    @Override
                    public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {
                    }

                    @Override
                    public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                        return new java.security.cert.X509Certificate[]{};
                    }
                };

                // 设置证书
//                try {
//                    clientBuilder.sslSocketFactory(RqbTrustManager.getInstance().getSSLSocketFactory("BKS", R.raw.rqb_ssl));
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }

                OkHttpClient client = clientBuilder
                        .sslSocketFactory(new SSLSocketFactoryCompat(trustAllCert), trustAllCert)
                        .build();
                retrofit = retrofitBuilder.client(client).
                        build();
                baseUrl2retrofit.put(baseUrl, retrofit);
            }
        }
        return retrofit.create(serviceClass);
    }
}
