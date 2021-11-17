package com.app.util;

import android.text.TextUtils;
import android.util.Base64;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

/**
 * 加密解密类
 */
public class DecryptUtil {
    /**
     * DES加密算法
     *
     * @param mode    模式： 加密，解密
     * @param data    需要加密的内容
     * @param keyData 密钥 8个字节数组
     * @return 将内容加密后的结果也是byte[]格式的
     */
    private static byte[] des(int mode, byte[] data, byte[] keyData) {
        byte[] ret = null;
        //加密的内容存在并且密钥存在且长度为8个字节
        if (data != null && data.length > 0 && keyData != null && keyData.length == 8) {
            try {
                Cipher cipher = Cipher.getInstance("DES");

                DESKeySpec keySpec = new DESKeySpec(keyData);

                SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");

                SecretKey key = keyFactory.generateSecret(keySpec);

                cipher.init(mode, key);

                ret = cipher.doFinal(data);

            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            } catch (NoSuchPaddingException e) {
                e.printStackTrace();
            } catch (IllegalBlockSizeException e) {
                e.printStackTrace();
            } catch (BadPaddingException e) {
                e.printStackTrace();
            } catch (InvalidKeySpecException e) {
                e.printStackTrace();
            } catch (InvalidKeyException e) {
                e.printStackTrace();
            }
        }

        return ret;
    }
    //DES 加密
    /**
     * //DES 加密
     * 加密结果 URLEncoded
     * @param data 要加密的参数
     * @param passed  加密的密码
     * @return
     */
    public static String desEncryptToURLEncoded(String data,String passed) {
        if(TextUtils.isEmpty(data)||TextUtils.isEmpty(passed)){
            return "";
        }
        byte[] de = des(Cipher.ENCRYPT_MODE, data.getBytes(), passed.getBytes());
        String da=Base64.encodeToString(de, Base64.NO_WRAP);
        return toURLEncoded(da);
    }
    /**
     * //DES 加密
     * 加密结果 不要URLEncoded
     * @param data 要加密的参数
     * @param passed  加密的密码
     * @return
     */
    //DES 加密
    public static String desEncryptNotToURLEncoded(String data,String passed) {
        if(TextUtils.isEmpty(data)||TextUtils.isEmpty(passed)){
            return "";
        }
        byte[] de = des(Cipher.ENCRYPT_MODE, data.getBytes(), passed.getBytes());
        String da=Base64.encodeToString(de, Base64.NO_WRAP);
        return da;
    }

    //DES 解密

    /**
     * 解密
     * @param data 密文
     * @param passed 密码
     * @return
     */
    public static byte[] desDecrypt(byte[] data,String passed) {
        if(data==null||TextUtils.isEmpty(passed)){
            return null;
        }
        return des(Cipher.DECRYPT_MODE, Base64.decode(data, Base64.NO_WRAP), passed.getBytes());
    }

    public static String toURLEncoded(String paramString) {
        if (paramString == null || paramString.equals("")) {
            return "";
        }
        try {
            String str = new String(paramString.getBytes(), "UTF-8");
             str = URLEncoder.encode(str, "UTF-8");
            return str;
        } catch (Exception localException) {
            MLog.e("hdp", "toURLEncoded error:" + paramString + ":" + localException.toString());
        }

        return "";
    }
    public static String URLDecoder(String paramString) {
        if (paramString == null || paramString.equals("")) {
            return "";
        }
        try {
            String str = new String(paramString.getBytes(), "UTF-8");
            str = URLDecoder.decode(str, "UTF-8");
            return str;
        } catch (Exception localException) {
            MLog.e("hdp", "toURLEncoded error:" + paramString + ":" + localException.toString());
        }

        return "";
    }
}



