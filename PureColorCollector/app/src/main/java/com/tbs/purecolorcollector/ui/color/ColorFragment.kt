package com.tbs.purecolorcollector.ui.color

import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.core.graphics.ColorUtils
import androidx.core.graphics.blue
import androidx.core.graphics.green
import androidx.core.graphics.red
import com.tbs.common.utils.MLog
import com.tbs.purecolorcollector.MyApplication
import com.tbs.purecolorcollector.base.BaseFragment
import com.tbs.purecolorcollector.base.BasicRecycleAdapter.OnClickListener
import com.tbs.purecolorcollector.databinding.ColorFragmentBinding
import com.tbs.purecolorcollector.ui.MainActivity
import io.iftech.android.library.emoji.EmojiB
import io.iftech.android.library.emoji.EmojiUtils
import io.iftech.android.library.square.SquareLayoutManager
import java.lang.String
import kotlin.random.Random

/**
 * author jingting
 * date : 2021/11/84:41 下午
 */
class ColorFragment : BaseFragment<ColorFragmentBinding>(), OnClickListener {

    private var squareLayoutManager: SquareLayoutManager? = null
    private var emojiList: List<EmojiB> = arrayListOf()


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        emojiList = EmojiUtils.loadEmoji(MyApplication.getContext())

        val adapter = ColorAdapter(context)
        binding.rvSquare.adapter = adapter

        val colorList = arrayListOf<Int>()

        for (i in 1..100) {

            colorList.add(  Color.argb(
                    255,
                    Random.nextInt(255),
                    Random.nextInt(255),
                    Random.nextInt(255)
            ))

        }
        adapter.addData(colorList)

        binding.rvSquare.apply {
            this.adapter = adapter
            binding.rvSquare.layoutManager = SquareLayoutManager(20).apply {
                squareLayoutManager = this
                setOnItemSelectedListener { postion ->

//                    val colorRGB = colorList[postion]
//                    val colorHex = String.format("#%02X%02X%02X", colorRGB.red, colorRGB.green, colorRGB.blue)
//                    MLog.d("jt-->", colorHex.toString())
//
//                    if (activity != null) {
//                        (activity as MainActivity).setCurrentColor(colorHex)
//                    }

//                    Toast.makeText(context, "当前选中：$postion", Toast.LENGTH_SHORT).show()
                }

            }
        }

        adapter.listener = this
//        btnCenter.setOnClickListener {
//            squareLayoutManager?.smoothScrollToCenter()
//        }
    }

    override fun addViewListener() {

    }

    override fun click(which: Int, obj: Any?) {
        binding.rvSquare.setBackgroundColor((obj as Int))
        squareLayoutManager?.smoothScrollToPosition(which)
    }
}