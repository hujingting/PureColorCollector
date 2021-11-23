package com.tbs.purecolorcollector.ui.color

import android.graphics.Color
import android.graphics.drawable.Drawable
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.tbs.purecolorcollector.MyApplication
import com.tbs.purecolorcollector.databinding.ItemColorBinding
import io.iftech.android.library.emoji.EmojiB
import java.io.InputStream
import java.lang.Exception
import kotlin.random.Random

/**
 * author jingting
 * date : 2021/11/233:05 下午
 */

class ColorAdapter(private val emojiList: List<EmojiB>) : RecyclerView.Adapter<ColorAdapter.PaymentHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PaymentHolder {
        val itemBinding =
            ItemColorBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return PaymentHolder(itemBinding)
    }

    override fun onBindViewHolder(holder: PaymentHolder, position: Int) {
        val emojiB: EmojiB = emojiList[position]
        holder.bind(emojiB)
    }

    override fun getItemCount(): Int = emojiList.size

    class PaymentHolder(private val itemBinding: ItemColorBinding) :
        RecyclerView.ViewHolder(itemBinding.root) {
        fun bind(emojiB: EmojiB) {

            itemBinding.root.setBackgroundColor(
                Color.argb(
                    255,
                    Random.nextInt(255),
                    Random.nextInt(255),
                    Random.nextInt(255)
                )
            )

            itemBinding.tvContent.text = layoutPosition.toString()
            itemBinding.ivEmoji.setImageDrawable(loadDrawableFromAssets("default/" + emojiB.name))
        }

        private fun loadDrawableFromAssets(path: String?): Drawable? {
            var stream: InputStream? = null
            try {
                stream = path?.let { MyApplication.getContext().getAssets().open(it) }
                return Drawable.createFromStream(stream, null)
            } catch (ignored: Exception) {

            } finally {
                try {
                    stream?.close()
                } catch (ignored: Exception) {
                }
            }
            return null
        }
    }

}
