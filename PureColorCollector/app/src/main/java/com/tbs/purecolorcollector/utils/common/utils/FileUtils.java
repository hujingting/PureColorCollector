package com.tbs.purecolorcollector.utils.common.utils;

import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;

import com.bumptech.glide.util.Util;
import com.tbs.purecolorcollector.MyApplication;
import com.tbs.purecolorcollector.utils.PureColorUtils;

import java.io.File;

public class FileUtils {

    private static final String DIR_NAME = AppUtil.getAppName(PureColorUtils.INSTANCE.getContext());

    public static String getFilePath(Context context, String imgName) {
        return getPath(context, imgName, DIR_NAME, false);
    }


    private static String getPath(Context context, String imgName, String dirName, boolean saveToSdcard) {
        File f;
        if (saveToSdcard) {
            f = new File(Environment.getExternalStorageDirectory() + File.separator + dirName);
        } else {
            f = new File(context.getExternalFilesDir(null) + File.separator + dirName);
        }
        if (!f.exists()) {
            if (f.mkdirs())
                return f.getAbsolutePath() + File.separator + imgName;
        } else
            return f.getAbsolutePath() + File.separator + imgName;
        return imgName;
    }

    public static String getImageDirPath(Context context) {
        return getDirPath(context, DIR_NAME, true);
    }

    private static String getDirPath(Context context, String dirName, boolean saveToSdcard) {
        File f;
        if (saveToSdcard) {
            f = new File(Environment.getExternalStorageDirectory() + File.separator + dirName);
        } else {
            f = new File(context.getExternalFilesDir(null) + File.separator + dirName);
        }
        if (!f.exists()) {
            if (f.mkdirs())
                return f.getAbsolutePath();
        } else
            return f.getAbsolutePath();
        return f.getAbsolutePath();
    }

    public static void saveImageToMediaStore(Context context, File file) {
        ContentValues values = new ContentValues();
        ContentResolver resolver = context.getContentResolver();
        values.put(MediaStore.Images.ImageColumns.DATA, file.getAbsolutePath());
        values.put(MediaStore.Images.ImageColumns.TITLE, file.getName());
        values.put(MediaStore.Images.ImageColumns.DISPLAY_NAME, file.getName());
        values.put(MediaStore.Images.ImageColumns.MIME_TYPE, "image/png");

        Uri uri = resolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
        if (uri != null) {
            resolver.update(uri, values, null, null);
        }
    }

}
