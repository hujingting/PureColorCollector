package com.tbs.common.net;

import android.text.TextUtils;

import com.tbs.common.config.AppConfig;
import com.tbs.common.utils.DecryptUtil;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.charset.UnsupportedCharsetException;
import java.util.HashMap;
import java.util.Map;

import androidx.annotation.NonNull;
import okhttp3.FormBody;
import okhttp3.Headers;
import okhttp3.Interceptor;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;
import okio.Buffer;
import okio.BufferedSource;

public class CommonInterceptor implements Interceptor {

    public static Map<String, String> commonParams;

    public synchronized static void setCommonParam(Map<String, String> commonParams) {
        if (commonParams != null) {
            if (CommonInterceptor.commonParams != null) {
                CommonInterceptor.commonParams.clear();
            } else {
                CommonInterceptor.commonParams = new HashMap<>();
            }
            for (String paramKey : commonParams.keySet()) {
                CommonInterceptor.commonParams.put(paramKey, commonParams.get(paramKey));
            }
        }
    }

    public synchronized static void updateOrInsertCommonParam(@NonNull String paramKey, @NonNull String paramValue) {
        if (commonParams == null) {
            commonParams = new HashMap<>();
        }
        commonParams.put(paramKey, paramValue);
    }

    @Override
    public synchronized Response intercept(Chain chain) throws IOException {
        Request request = rebuildRequest(chain.request());
        Response response = chain.proceed(request);

        ResponseBody responseBody = response.body();
        String respBody = null;
        if (responseBody != null) {
            BufferedSource source = responseBody.source();
            source.request(Long.MAX_VALUE);
            Buffer buffer = source.buffer();

            Charset charset = Charset.forName("UTF-8");
            MediaType contentType = responseBody.contentType();
            if (contentType != null) {
                try {
                    charset = contentType.charset(Charset.forName("UTF-8"));
                } catch (UnsupportedCharsetException e) {
                    e.printStackTrace();
                }
            }
            //接口返回的加密数据
            respBody = buffer.clone().readString(charset);
        }

        String restxt = new String(respBody.getBytes());
//        if (AppConfig.isEncryption) {
//            byte[] data = DecryptUtil.desDecrypt(respBody.getBytes(), ControllerFactory.getAppController().getFunctionRouter().obtainKeyWords());
//            String info = new String(data, StandardCharsets.UTF_8);
//            //对info 解密
//            ResponseBody responseBody1 = ResponseBody.create(responseBody.contentType(), info);
//            return response.newBuilder().body(responseBody1).build();
//        }

//
//        // 输出返回结果
//        try {
//            Charset charset;
//            charset = StandardCharsets.UTF_8;
//            ResponseBody responseBody = response.peekBody(Long.MAX_VALUE);
//            Reader jsonReader = new InputStreamReader(responseBody.byteStream(), charset);
//            BufferedReader reader = new BufferedReader(jsonReader);
//            StringBuilder sbJson = new StringBuilder();
//            String line = reader.readLine();
//            do {
//                sbJson.append(line);
//                line = reader.readLine();
//            } while (line != null);
//            MLog.e("response: " + sbJson.toString());
//            if(AppConfig.isEncryption){
//                byte[]data = DecryptUtil.desDecrypt(response.body().bytes(), ControllerFactory.getAppController().getFunctionRouter().obtainKeyWords());
//                String info = new String(data, StandardCharsets.UTF_8);
//
//                UpdateP update = new UpdateP();
//                update.has_new_version = true;
//                info = new Gson().toJson(update);
//
//                //对info 解密
//                ResponseBody responseBody1 = ResponseBody.create(responseBody.contentType(), info);
//                response = response.newBuilder().body(responseBody1).build();
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        saveCookies(response, request.url().toString());
        return response;
    }


    public static byte[] toByteArray(RequestBody body) throws IOException {
        Buffer buffer = new Buffer();
        body.writeTo(buffer);
        InputStream inputStream = buffer.inputStream();
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        byte[] bufferWrite = new byte[4096];
        int n;
        while (-1 != (n = inputStream.read(bufferWrite))) {
            output.write(bufferWrite, 0, n);
        }
        return output.toByteArray();
    }

    private Request rebuildRequest(Request request) throws IOException {
        Request newRequest;
        if ("POST".equals(request.method())) {
            newRequest = rebuildPostRequest(request);
        } else if ("GET".equals(request.method())) {
            newRequest = rebuildGetRequest(request);
        } else {
            newRequest = request;
        }
        return newRequest;
    }

    /**
     * 对post请求添加统一参数
     */
    private Request rebuildPostRequest(Request request) {
//        if (commonParams == null || commonParams.size() == 0) {
//            return request;
//        }
        Map<String, String> signParams = new HashMap<>(); // 假设你的项目需要对参数进行签名
        RequestBody originalRequestBody = request.body();

        assert originalRequestBody != null;
        RequestBody newRequestBody;
        if (originalRequestBody instanceof FormBody) { // 传统表单
            FormBody.Builder builder = new FormBody.Builder();
            FormBody requestBody = (FormBody) request.body();
            int fieldSize = requestBody == null ? 0 : requestBody.size();
            for (int i = 0; i < fieldSize; i++) {
//                builder.add(requestBody.name(i), requestBody.value(i));
                signParams.put(requestBody.name(i), requestBody.value(i));
            }
            if (commonParams != null && commonParams.size() > 0) {
                for (String paramKey : commonParams.keySet()) {
                    signParams.put(paramKey, commonParams.get(paramKey));
                }
            }


            // ToDo 此处可对参数做签名处理 signParams
            /**
             * String sign = SignUtil.sign(signParams);
             * builder.add("sign", sign);
             */
            StringBuilder sb = new StringBuilder();
            for (String string : signParams.keySet()) {
                sb.append(string).append("=").append(signParams.get(string)).append("&");
            }
//            if (AppConfig.isEncryption && !TextUtils.isEmpty(ControllerFactory.getAppController().getFunctionRouter().obtainKeyWords())) {
//
//                builder.add("_p", DecryptUtil.desEncryptNotToURLEncoded(sb.toString(), ControllerFactory.getAppController().getFunctionRouter().obtainKeyWords()));
//            } else {
//                List<NameValuePair> pairs = new ArrayList<>();
//                for (String key : signParams.keySet()) {
//                    if (signParams.get(key) != null) {
//                        builder.add(key, Objects.requireNonNull(signParams.get(key)));
//                    }
//                }
//            }
            newRequestBody = builder.build();
        } else if (originalRequestBody instanceof MultipartBody) { // 文件
            MultipartBody requestBody = (MultipartBody) request.body();
            MultipartBody.Builder multipartBodybuilder = new MultipartBody.Builder();
            multipartBodybuilder.setType(MultipartBody.FORM);
            if (requestBody != null) {
                for (int i = 0; i < requestBody.size(); i++) {
                    MultipartBody.Part part = requestBody.part(i);
                    if (requestBody.part(i).body().contentType() != null && requestBody.part(i).body().contentType().equals(MediaType.parse("application/octet-stream"))) {
                        multipartBodybuilder.addPart(part);
                    } else {
                        String normalParamKey;
                        String normalParamValue;
                        try {
                            normalParamValue = getParamContent(requestBody.part(i).body());
                            Headers headers = part.headers();
                            if (!TextUtils.isEmpty(normalParamValue) && headers != null) {
                                for (String name : headers.names()) {
                                    String headerContent = headers.get(name);
                                    if (!TextUtils.isEmpty(headerContent)) {
                                        String[] normalParamKeyContainer = headerContent.split("name=\"");
                                        if (normalParamKeyContainer.length == 2) {
                                            normalParamKey = normalParamKeyContainer[1].split("\"")[0];
                                            signParams.put(normalParamKey, normalParamValue);
                                            break;
                                        }
                                    }
                                }
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }

                    /*
                     上传文件时，请求方法接收的参数类型为RequestBody或MultipartBody.Part参见ApiService文件中uploadFile方法
                     RequestBody作为普通参数载体，封装了普通参数的value; MultipartBody.Part即可作为普通参数载体也可作为文件参数载体
                     当RequestBody作为参数传入时，框架内部仍然会做相关处理，进一步封装成MultipartBody.Part，因此在拦截器内部，
                     拦截的参数都是MultipartBody.Part类型
                     */

                    /*
                     1.若MultipartBody.Part作为文件参数载体传入，则构造MultipartBody.Part实例时，
                     需使用MultipartBody.Part.createFormData(String name, @Nullable String filename, RequestBody body)方法，
                     其中name参数可作为key使用(因为你可能一次上传多个文件，服务端可以此作为区分)且不能为null，
                     body参数封装了包括MimeType在内的文件信息，其实例创建方法为RequestBody.create(final @Nullable MediaType contentType, final File file)
                     MediaType获取方式如下：
                     String fileType = FileUtil.getMimeType(file.getAbsolutePath());
                     MediaType mediaType = MediaType.parse(fileType);

                     2.若MultipartBody.Part作为普通参数载体，建议使用MultipartBody.Part.createFormData(String name, String value)方法创建Part实例
                       name可作为key使用，name不能为null,通过这种方式创建的实例，其RequestBody属性的MediaType为null；当然也可以使用其他方法创建
                     */

                    /*
                      提取非文件参数时,以RequestBody的MediaType为判断依据.
                      此处提取方式简单暴力。默认part实例的RequestBody成员变量的MediaType为null时，part为非文件参数
                      前提是:
                      a.构造RequestBody实例参数时，将MediaType设置为null
                      b.构造MultipartBody.Part实例参数时,推荐使用MultipartBody.Part.createFormData(String name, String value)方法，或使用以下方法
                        b1.MultipartBody.Part.create(RequestBody body)
                        b2.MultipartBody.Part.create(@Nullable Headers headers, RequestBody body)
                        若使用方法b1或b2，则要求

                      备注：
                      您也可根据需求修改RequestBody的MediaType，但尽量保持外部传入参数的MediaType与拦截器内部添加参数的MediaType一致，方便统一处理
                     */

//                    MediaType mediaType = part.body().contentType();
//                    if (mediaType == null) {
//                        String normalParamKey;
//                        String normalParamValue;
//                        try {
//                            normalParamValue = getParamContent(requestBody.part(i).body());
//                            Headers headers = part.headers();
//                            if (!TextUtils.isEmpty(normalParamValue) && headers != null) {
//                                for (String name : headers.names()) {
//                                    String headerContent = headers.get(name);
//                                    if (!TextUtils.isEmpty(headerContent)) {
//                                        String[] normalParamKeyContainer = headerContent.split("name=\"");
//                                        if (normalParamKeyContainer.length == 2) {
//                                            normalParamKey = normalParamKeyContainer[1].split("\"")[0];
//                                            signParams.put(normalParamKey, normalParamValue);
//                                            break;
//                                        }
//                                    }
//                                }
//                            }
//                        } catch (Exception e) {
//                            e.printStackTrace();
//                        }
//                    }
                }
            }
            if (commonParams != null && commonParams.size() > 0) {
                signParams.putAll(commonParams);
                StringBuilder sb = new StringBuilder();
                for (String string : signParams.keySet()) {
                    sb.append(string).append("=").append(signParams.get(string)).append("&");
                }

//                if (AppConfig.isEncryption && !TextUtils.isEmpty(ControllerFactory.getAppController().getFunctionRouter().obtainKeyWords())) {
//                    multipartBodybuilder.addFormDataPart("_p", DecryptUtil.desEncryptNotToURLEncoded(sb.toString(), ControllerFactory.getAppController().getFunctionRouter().obtainKeyWords()));
//                } else {
//                    for (String paramKey : signParams.keySet()) {
//                        // 两种方式添加公共参数
//                        // method 1
//                        multipartBodybuilder.addFormDataPart(paramKey, signParams.get(paramKey));
//                        // method 2
////                    MultipartBody.Part part = MultipartBody.Part.createFormData(paramKey, commonParams.get(paramKey));
////                    multipartBodybuilder.addPart(part);
//                    }
//                }

            }


            // ToDo 此处可对参数做签名处理 signParams
            /**
             * String sign = SignUtil.sign(signParams);
             * multipartBodybuilder.addFormDataPart("sign", sign);
             */
            newRequestBody = multipartBodybuilder.build();
        } else {
            try {
                JSONObject jsonObject;
                if (originalRequestBody.contentLength() == 0) {
                    jsonObject = new JSONObject();
                } else {
                    jsonObject = new JSONObject(getParamContent(originalRequestBody));
                }
                if (commonParams != null && commonParams.size() > 0) {
                    for (String commonParamKey : commonParams.keySet()) {
                        jsonObject.put(commonParamKey, commonParams.get(commonParamKey));
                    }
                }
                // ToDo 此处可对参数做签名处理
                /**
                 * String sign = SignUtil.sign(signParams);
                 * jsonObject.put("sign", sign);
                 */
                newRequestBody = RequestBody.create(originalRequestBody.contentType(), jsonObject.toString());

            } catch (Exception e) {
                newRequestBody = originalRequestBody;
                e.printStackTrace();
            }
        }
//        可根据需求添加或修改header,此处制作示意
//       return request.newBuilder()
//                .addHeader("header1", "header1")
//                .addHeader("header2", "header2")
//                .method(request.method(), newRequestBody)
//                .build();
        return request.newBuilder().method(request.method(), newRequestBody).build();
    }

    /**
     * 获取常规post请求参数
     */
    private String getParamContent(RequestBody body) throws IOException {
        Buffer buffer = new Buffer();
        body.writeTo(buffer);
        return buffer.readUtf8();
    }

    /**
     * 对get请求做统一参数处理
     */
    private Request rebuildGetRequest(Request request) {

        if (commonParams == null || commonParams.size() == 0) {
            return request;
        }

        String url = request.url().toString();

//        url = NUtil.get(url);

        if (url.contains("?")) {
            url = url + "&";
        } else {
            url = url + "?";
        }
        url += getCommonFieldString();

//        if (AppConfig.isEncryption && !TextUtils.isEmpty(ControllerFactory.getAppController().getFunctionRouter().obtainKeyWords())) {
//            String parameter = url.substring(url.indexOf("?") + 1, url.length());
//            parameter = DecryptUtil.URLDecoder(parameter);
//            url = url.substring(0, url.indexOf("?") + 1) + "_p=" + DecryptUtil.desEncryptToURLEncoded(parameter, ControllerFactory.getAppController().getFunctionRouter().obtainKeyWords());
//        }
        Request.Builder requestBuilder = request.newBuilder();

        return requestBuilder.url(url).build();
    }


    public String getCommonFieldString() {
        StringBuffer sb = new StringBuffer();
        if (commonParams == null)
            return sb.toString();
        try {
            int i = 0;
            for (String item : commonParams.keySet()) {
                if (i > 0) {
                    sb.append("&");
                }
                sb.append(item);
                sb.append('=');
                String value = commonParams.get(item);
                sb.append(URLEncoder.encode((value), "utf-8"));
                i++;
            }
        } catch (Exception e) {

        }
        return sb.toString();
    }
}