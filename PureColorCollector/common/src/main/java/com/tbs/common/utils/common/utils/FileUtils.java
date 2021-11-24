package com.tbs.common.utils.common.utils;

import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;

import com.tbs.common.base.BaseApplication;
import com.tbs.common.utils.AndroidVersion;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Arrays;

import androidx.annotation.NonNull;

public class FileUtils {

    private static final String DIR_NAME = AppUtil.getAppName(BaseApplication.Companion.getContext());

    public static String getFilePath(Context context, String imgName) {
        return getPath(context, imgName, DIR_NAME, false);
    }


    private static String getPath(Context context, String imgName, String dirName, boolean saveToSdcard) {
        File f;
        if (saveToSdcard) {
            f = new File(Environment.getExternalStorageDirectory() + File.separator + dirName);
        } else {
            f = new File(Arrays.toString(context.getExternalFilesDirs(null)) + File.separator + dirName);
        }
        if (!f.exists()) {
            if (f.mkdirs())
                return f.getAbsolutePath() + File.separator + imgName;
        } else
            return f.getAbsolutePath() + File.separator + imgName;
        return imgName;
    }

    public static String getImageDirPath(Context context) {
        return getDirPath(context, DIR_NAME, false);
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

    public static void saveImage(Bitmap bitmap, @NonNull String name) throws IOException {
        boolean saved;
        OutputStream fos;
        File image = null;

        if (AndroidVersion.INSTANCE.hasQ()) {
            ContentResolver resolver = BaseApplication.Companion.getContext().getContentResolver();
            ContentValues contentValues = new ContentValues();
            contentValues.put(MediaStore.MediaColumns.DISPLAY_NAME, name);
            contentValues.put(MediaStore.MediaColumns.MIME_TYPE, "image/png");
            contentValues.put(MediaStore.MediaColumns.RELATIVE_PATH, "DCIM/" + DIR_NAME);
            Uri imageUri = resolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, contentValues);
            fos = resolver.openOutputStream(imageUri);
        } else {
            String imagesDir = getImageDirPath(BaseApplication.Companion.getContext());

            File file = new File(imagesDir);

            if (!file.exists()) {
                file.mkdir();
            }

            image = new File(imagesDir, name + ".png");
            fos = new FileOutputStream(image);
        }

        saved = bitmap.compress(Bitmap.CompressFormat.PNG, 100, fos);
        fos.flush();
        fos.close();

        if (image != null) {
            saveImageToMediaStore(BaseApplication.Companion.getContext(), image);
        }
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
