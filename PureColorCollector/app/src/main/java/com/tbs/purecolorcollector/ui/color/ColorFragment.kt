package com.tbs.purecolorcollector.ui.color

import android.graphics.Color
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import com.tbs.purecolorcollector.R
import com.tbs.purecolorcollector.base.BaseFragment
import com.tbs.purecolorcollector.databinding.ColorFragmentBinding
import io.iftech.android.library.square.SquareLayoutManager
import kotlin.random.Random

/**
 * author jingting
 * date : 2021/11/84:41 下午
 */
class ColorFragment : BaseFragment() {

    private var _binding: ColorFragmentBinding?= null
    private val binding get() = _binding!!
    private var squareLayoutManager: SquareLayoutManager? = null

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

        val adapter = object : RecyclerView.Adapter<RecyclerView.ViewHolder>() {
            override fun onCreateViewHolder(
                parent: ViewGroup,
                viewType: Int
            ): RecyclerView.ViewHolder {
                val view = LayoutInflater.from(parent.context)
                    .inflate(R.layout.view_holder_debug_rv_square, parent, false)
                return object : RecyclerView.ViewHolder(view) {}
            }

            override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
                holder.itemView.setBackgroundColor(
                    Color.argb(
                        255,
                        Random.nextInt(255),
                        Random.nextInt(255),
                        Random.nextInt(255)
                    )
                )
                holder.itemView.findViewById<TextView>(R.id.tvContent).text = position.toString()
                holder.itemView.setOnClickListener {
                    binding.rvSquare.smoothScrollToPosition(position)
                }
            }

            override fun getItemCount(): Int {
                return 1000
            }
        }

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