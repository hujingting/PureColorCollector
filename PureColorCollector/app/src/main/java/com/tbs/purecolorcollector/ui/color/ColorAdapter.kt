package com.tbs.purecolorcollector.ui.color

import android.content.Context
import android.graphics.Color
import android.graphics.drawable.Drawable
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.tbs.purecolorcollector.MyApplication
import com.tbs.purecolorcollector.R
import com.tbs.purecolorcollector.base.BasicRecycleAdapter
import com.tbs.purecolorcollector.databinding.ItemColorBinding
import io.iftech.android.library.emoji.EmojiB
import java.io.InputStream
import java.lang.Exception
import kotlin.random.Random

/**
 * author jingting
 * date : 2021/11/233:05 下午
 */

class ColorAdapter(context: Context?) : BasicRecycleAdapter<Int>(context) {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PaymentHolder {
        val itemView = LayoutInflater.from(mContext).inflate(R.layout.item_color, parent, false)
        return PaymentHolder(itemView)
    }


    override fun onBindViewHolder(viewHolder: RecyclerView.ViewHolder, position: Int) {
        val color = getItem(position)
        val holder = viewHolder as PaymentHolder

        holder.itemView.setBackgroundColor(color)

        holder.tvContent.text = position.toString()

        holder.itemView.setOnClickListener {
            listener?.click(position, color)
        }

//        holder.ivEmoji.setImageDrawable(loadDrawableFromAssets("default/" + emojiB.name))
    }


    class PaymentHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        val tvContent: TextView = itemView.findViewById(R.id.tvContent)
        val ivEmoji: ImageView = itemView.findViewById(R.id.iv_emoji)
    }

    /**
     * 获取 emoji 资源 😄
     */
//    private fun loadDrawableFromAssets(path: String?): Drawable? {
//        var stream: InputStream? = null
//        try {
//            stream = path?.let { MyApplication.getContext().getAssets().open(it) }
//            return Drawable.createFromStream(stream, null)
//        } catch (ignored: Exception) {
//
//        } finally {
//            try {
//                stream?.close()
//            } catch (ignored: Exception) {
//            }
//        }
//        return null
//    }


}




