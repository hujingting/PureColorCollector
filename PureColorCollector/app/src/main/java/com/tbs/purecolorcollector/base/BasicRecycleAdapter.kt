package com.tbs.purecolorcollector.base

import android.content.Context
import androidx.recyclerview.widget.RecyclerView
import com.tbs.common.utils.MLog
import java.util.*

/**
 * Create by  on 2019/7/30
 */
abstract class BasicRecycleAdapter<T>(protected var mContext: Context?) : RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    protected var data: MutableList<T> = mutableListOf()

    var listener: OnClickListener? = null


    fun addData(data: MutableList<T>) {
        this.data!!.addAll(data)
        MLog.d(">>>>添加数据: $data")
        notifyDataSetChanged()
    }

    fun addData(data: T) {
        if (data != null) {
            this.data!!.add(data)
            MLog.d(">>>>添加数据: " + data.toString())
            notifyDataSetChanged()
        } else {
            val dataList: MutableList<T> = ArrayList()
            dataList.add(data)
            this.data = dataList
        }
    }


    override fun getItemCount(): Int {
        return data?.size ?: 0
    }

    protected fun getItem(position: Int): T {
        return data!![position]
    }

    abstract override fun onBindViewHolder(viewHolder: RecyclerView.ViewHolder, position: Int)


    public interface OnClickListener {
        fun click(which: Int, obj: Any?)
    }
}