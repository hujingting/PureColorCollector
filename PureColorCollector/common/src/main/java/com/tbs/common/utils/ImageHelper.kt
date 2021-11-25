package com.tbs.common.utils

import android.app.Activity
import android.content.Context
import android.graphics.Bitmap
import android.graphics.drawable.Drawable
import android.text.TextUtils
import android.widget.ImageView
import androidx.fragment.app.Fragment
import com.bumptech.glide.Glide
import com.bumptech.glide.load.DataSource
import com.bumptech.glide.load.DecodeFormat
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.bumptech.glide.load.engine.GlideException
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.bumptech.glide.load.resource.gif.GifDrawable
import com.bumptech.glide.request.RequestListener
import com.bumptech.glide.request.RequestOptions
import com.bumptech.glide.request.target.SimpleTarget
import com.bumptech.glide.request.target.Target
import com.bumptech.glide.request.transition.Transition
import com.tbs.common.controller.RequestDataCallback
import com.tbs.common.listener.IGetBitmapListener
import com.tbs.common.utils.ScreenUtils.dip2px
import java.io.File

object ImageHelper {

    fun bindLocalImage(context: Context?, filePath: String?, view: ImageView?) {
        if (!isValidContext(context) || TextUtils.isEmpty(filePath)) {
            return
        }
        Glide.with(context!!)
            .load(File(filePath))
            .into(view!!)
    }

    fun bindLocalImage(context: Context?, drawableId: Int, view: ImageView?) {
        if (!isValidContext(context)) {
            return
        }
        Glide.with(context!!)
            .load(drawableId)
            .into(view!!)
    }

    fun bindLocalImageSkipCache(context: Context?, filePath: String?, view: ImageView?) {
        if (!isValidContext(context) || TextUtils.isEmpty(filePath)) {
            return
        }
        Glide.with(context!!)
            .load(File(filePath))
            .dontAnimate()
            .diskCacheStrategy(DiskCacheStrategy.NONE)
            .into(view!!)
    }

    @JvmOverloads
    fun bindImageUrl(context: Context?, url: String, view: ImageView, defaultImage: Int = 0) {
        if (!isValidContext(context)) {
            return
        }
        if (defaultImage == 0) {
            bingImageUrlWithDefaultPlaceHolder(context, url, view)
        } else {
            Glide.with(context!!)
                .applyDefaultRequestOptions(RequestOptions().format(DecodeFormat.PREFER_RGB_565))
                .load(url)
                .dontAnimate()
                .placeholder(defaultImage)
                .error(defaultImage)
                .into(view)
        }
    }

    private fun bingImageUrlWithDefaultPlaceHolder(
        context: Context?,
        url: String,
        view: ImageView
    ) {
        if (!isValidContext(context)) {
            return
        }
        Glide.with(context!!)
            .applyDefaultRequestOptions(RequestOptions().format(DecodeFormat.PREFER_RGB_565))
            .load(url)
            .dontAnimate() //                .placeholder(R.drawable.img_default_place_holder)
            //                .error(R.drawable.img_default_place_holder)
            .into(view)
    }

    fun bingImageUrlNoDefaultPlaceholder(context: Context?, url: String?, view: ImageView?) {
        if (!isValidContext(context)) {
            return
        }
        Glide.with(context!!)
            .applyDefaultRequestOptions(RequestOptions().format(DecodeFormat.PREFER_RGB_565))
            .load(url)
            .dontAnimate()
            .into(view!!)
    }

    private fun bingImageUrlWithDefaultPlaceHolder(
        fragment: Fragment?,
        url: String,
        view: ImageView
    ) {
        if (fragment == null) {
            return
        }
        if (!isValidContext(fragment.activity)) {
            return
        }
        Glide.with(fragment)
            .applyDefaultRequestOptions(RequestOptions().format(DecodeFormat.PREFER_RGB_565))
            .load(url)
            .dontAnimate() //                .placeholder(R.drawable.img_default_place_holder)
            //                .error(R.drawable.img_default_place_holder)
            .into(view)
    }

    /**
     * 加载 gif 图片
     *
     * @param context
     * @param url
     * @param view
     * @param defaultImage
     */
    fun bindGifImageUrl(context: Context?, url: String?, view: ImageView?, defaultImage: Int) {
        if (!isValidContext(context)) {
            return
        }
        Glide.with(context!!)
            .applyDefaultRequestOptions(RequestOptions().format(DecodeFormat.PREFER_ARGB_8888))
            .asGif()
            .load(url)
            .placeholder(defaultImage)
            .error(defaultImage)
            .into(view!!)
    }

    /**
     * 加载 本地gif 图片
     *
     * @param context
     * @param drawable
     * @param view
     */
    fun bindLocalGifImageUrl(context: Context?, drawable: Drawable?, view: ImageView?) {
        if (!isValidContext(context)) {
            return
        }
        Glide.with(context!!)
            .applyDefaultRequestOptions(RequestOptions().format(DecodeFormat.PREFER_ARGB_8888))
            .asGif()
            .load(drawable)
            .into(view!!)
    }

    @JvmOverloads
    fun bindImageUrl(fragment: Fragment?, url: String, view: ImageView, defaultImage: Int = 0) {
        if (fragment == null) {
            return
        }
        if (!isValidContext(fragment.activity)) {
            return
        }
        if (defaultImage == 0) {
            bingImageUrlWithDefaultPlaceHolder(fragment, url, view)
        } else {
            Glide.with(fragment)
                .applyDefaultRequestOptions(RequestOptions().format(DecodeFormat.PREFER_RGB_565))
                .load(url)
                .dontAnimate()
                .placeholder(defaultImage)
                .error(defaultImage)
                .into(view)
        }
    }

    /**
     * 某些情形下，你可能希望只要图片不在缓存中则加载直接失败（比如省流量模式
     */
    fun bindImageUrlFromCache(
        context: Context?,
        url: String?,
        view: ImageView?,
        defaultImage: Int
    ) {
        if (!isValidContext(context)) {
            return
        }
        Glide.with(context!!)
            .applyDefaultRequestOptions(RequestOptions().format(DecodeFormat.PREFER_RGB_565))
            .load(url)
            .dontAnimate()
            .placeholder(defaultImage)
            .error(defaultImage)
            .onlyRetrieveFromCache(true)
            .into(view!!)
    }

    fun bindGifImageUrl(
        context: Context?,
        imageView: ImageView?,
        url: String?,
        callback: RequestDataCallback<Boolean?>?
    ) {
        if (!isValidContext(context)) {
            return
        }
        Glide.with(context!!)
            .applyDefaultRequestOptions(RequestOptions().format(DecodeFormat.PREFER_ARGB_8888))
            .asGif()
            .load(url)
            .listener(object : RequestListener<GifDrawable?> {
                override fun onLoadFailed(
                    e: GlideException?,
                    model: Any,
                    target: Target<GifDrawable?>,
                    isFirstResource: Boolean
                ): Boolean {
                    callback?.dataCallback(false)
                    return false
                }

                override fun onResourceReady(
                    resource: GifDrawable?,
                    model: Any,
                    target: Target<GifDrawable?>,
                    dataSource: DataSource,
                    isFirstResource: Boolean
                ): Boolean {
                    callback?.dataCallback(true)
                    return false
                }
            }).into(imageView!!)
    }

    fun bindImageUrl(
        context: Context?,
        imageView: ImageView?,
        url: String?,
        callback: RequestDataCallback<Boolean?>?
    ) {
        if (!isValidContext(context)) {
            return
        }
        Glide.with(context!!)
            .asBitmap()
            .load(url)
            .dontAnimate()
            .listener(object : RequestListener<Bitmap?> {
                override fun onLoadFailed(
                    e: GlideException?,
                    model: Any,
                    target: Target<Bitmap?>,
                    isFirstResource: Boolean
                ): Boolean {
                    callback?.dataCallback(false)
                    return false
                }

                override fun onResourceReady(
                    resource: Bitmap?,
                    model: Any,
                    target: Target<Bitmap?>,
                    dataSource: DataSource,
                    isFirstResource: Boolean
                ): Boolean {
                    callback?.dataCallback(true)
                    return false
                }
            }).into(imageView!!)
    }

    fun bindImageUrl(context: Context?, url: String?, listener: IGetBitmapListener) {
        if (!isValidContext(context)) {
            return
        }
        Glide.with(context!!)
            .asBitmap()
            .load(url)
            .dontAnimate()
            .into(object : SimpleTarget<Bitmap?>() {
                override fun onResourceReady(
                    resource: Bitmap,
                    transition: Transition<in Bitmap?>?
                ) {
                    listener.onBitmap(resource)
                }

            })
    }

    /**
     * 圆角矩形
     */
    fun bindRoundImageUrl(
        context: Context?,
        url: String?,
        view: ImageView?,
        defaultImage: Int,
        roundingRadius: Int
    ) {
        if (!isValidContext(context)) {
            return
        }
        Glide.with(context!!)
            .applyDefaultRequestOptions(RequestOptions().format(DecodeFormat.PREFER_RGB_565))
            .load(url)
            .placeholder(defaultImage)
            .error(defaultImage)
            .transform(RoundedCorners(dip2px(roundingRadius.toFloat())))
            .into(view!!)
    }

    /**
     * 圆形
     */
    fun bindCircleImageUrl(context: Context?, url: String?, view: ImageView?, defaultImage: Int) {
        if (!isValidContext(context)) {
            return
        }
        Glide.with(context!!)
            .applyDefaultRequestOptions(RequestOptions().format(DecodeFormat.PREFER_RGB_565))
            .load(url)
            .placeholder(defaultImage)
            .error(defaultImage)
            .transform(RoundedCorners(dip2px(10f)))
            .into(view!!)
    }

    fun bindImageByUrlStrategyAll(context: Context?, url: String?, view: ImageView?) {
        if (!isValidContext(context)) {
            return
        }
        Glide.with(context!!)
            .load(url)
            .dontAnimate()
            .diskCacheStrategy(DiskCacheStrategy.ALL)
            .into(view!!)
    }

    fun bindImageByUrlSkipCache(context: Context?, url: String?, view: ImageView?) {
        if (!isValidContext(context)) {
            return
        }
        Glide.with(context!!)
            .load(url)
            .diskCacheStrategy(DiskCacheStrategy.NONE)
            .dontAnimate()
            .into(view!!)
    }

    /**
     * 判断 context 是否有效
     *
     * @param context
     * @return
     */
    fun isValidContext(context: Context?): Boolean {
        if (context == null) {
            return false
        }
        if (context is Activity) {
            val activity = context
            if (activity.isDestroyed || activity.isFinishing) {
                return false
            }
        }
        return true
    }

    fun resumeRequests(context: Context?) {
        if (!isValidContext(context)) {
            return
        }
        Glide.with(context!!).resumeRequests()
    }

    fun pauseRequests(context: Context?) {
        if (!isValidContext(context)) {
            return
        }
        Glide.with(context!!).pauseRequests()
    }
}