package com.tbs.common.utils

import android.annotation.SuppressLint
import android.annotation.TargetApi
import android.content.Context
import android.content.SharedPreferences
import android.os.Build
import com.tbs.common.base.BaseApplication.Companion.getContext
import com.tbs.common.utils.SPManager
import com.google.gson.Gson
import com.tbs.common.base.BaseApplication
import java.util.ArrayList

class SPManager @TargetApi(Build.VERSION_CODES.HONEYCOMB) @SuppressLint("CommitPrefEdits") private constructor() {
    fun putString(key: String?, value: String?) {
        if (edit != null) {
            edit!!.putString(key, value)
            edit!!.commit()
        }
    }

    fun putInt(key: String?, value: Int) {
        if (edit != null) {
            edit!!.putInt(key, value)
            edit!!.commit()
        }
    }

    fun putLong(key: String?, value: Long) {
        if (edit != null) {
            edit!!.putLong(key, value)
            edit!!.commit()
        }
    }

    fun putFloat(key: String?, value: Float) {
        if (edit != null) {
            edit!!.putFloat(key, value)
            edit!!.commit()
        }
    }

    fun putBoolean(key: String?, value: Boolean) {
        if (edit != null) {
            edit!!.putBoolean(key, value)
            edit!!.commit()
        }
    }

    fun getString(key: String?): String? {
        return if (sharedPreferences != null) {
            sharedPreferences!!.getString(key, null)
        } else null
    }

    fun getInt(key: String?): Int {
        return if (sharedPreferences != null) {
            sharedPreferences!!.getInt(key, 0)
        } else 0
    }

    fun getLong(key: String?): Long {
        return if (sharedPreferences != null) {
            sharedPreferences!!.getLong(key, 0)
        } else 0
    }

    fun getFloat(key: String?): Float {
        return if (sharedPreferences != null) {
            sharedPreferences!!.getFloat(key, 0.0f)
        } else 0.0f
    }

    fun getBoolean(key: String?): Boolean {
        return if (sharedPreferences != null) {
            sharedPreferences!!.getBoolean(key, false)
        } else false
    }

    /**
     * 保存List
     *
     * @param tag
     * @param datalist
     */
    fun <T> setDataList(tag: String?, datalist: List<T>?) {
        if (sharedPreferences != null) {
            val gson = Gson()
            //转换成json数据，再保存
            val strJson = gson.toJson(datalist)
            edit!!.putString(tag, strJson)
            edit!!.commit()
        }
    }

    /**
     * 获取List
     *
     * @param tag
     * @return
     */
    fun getDataList(tag: String?): List<String> {
        val dataList: List<String> = ArrayList()
        val strJson = sharedPreferences!!.getString(tag, null) ?: return dataList
        val gson = Gson()
        return gson.fromJson(strJson, ArrayList::class.java)
    }

    companion object {
        var sharedPreferences: SharedPreferences?
            get() = Companion.field
            private set
        private val mContext: Context? = null
        private var edit: SharedPreferences.Editor?
        val instance: SPManager
            get() = SPManager()
    }

    init {
        sharedPreferences = getContext().getSharedPreferences(
            mContext!!.packageName, Context.MODE_PRIVATE or Context.MODE_MULTI_PROCESS
        )
        edit = sharedPreferences.edit()
    }
}