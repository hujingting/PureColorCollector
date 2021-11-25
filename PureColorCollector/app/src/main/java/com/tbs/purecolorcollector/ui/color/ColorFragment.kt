package com.tbs.purecolorcollector.ui.color

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.tbs.purecolorcollector.MyApplication
import com.tbs.purecolorcollector.base.BaseFragment
import com.tbs.purecolorcollector.databinding.ColorFragmentBinding
import io.iftech.android.library.emoji.EmojiB
import io.iftech.android.library.emoji.EmojiUtils
import io.iftech.android.library.square.SquareLayoutManager

/**
 * author jingting
 * date : 2021/11/84:41 下午
 */
class ColorFragment : BaseFragment() {

    private var _binding: ColorFragmentBinding?= null
    private val binding get() = _binding!!
    private var squareLayoutManager: SquareLayoutManager? = null
    private var emojiList: List<EmojiB> = arrayListOf()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = ColorFragmentBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        emojiList = EmojiUtils.loadEmoji(MyApplication.getContext())

        val adapter = ColorAdapter(emojiList)
        binding.rvSquare.adapter = adapter

        binding.rvSquare.apply {
            this.adapter = adapter
            binding.rvSquare.layoutManager = SquareLayoutManager(20).apply {
                squareLayoutManager = this
                setOnItemSelectedListener { postion ->
                    Toast.makeText(context, "当前选中：$postion", Toast.LENGTH_SHORT).show()
                }
            }
        }

//        btnCenter.setOnClickListener {
//            squareLayoutManager?.smoothScrollToCenter()
//        }
    }

    override fun addViewListener() {

    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}