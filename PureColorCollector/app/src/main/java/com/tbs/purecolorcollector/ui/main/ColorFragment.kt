package com.tbs.purecolorcollector.ui.main

import android.app.Fragment
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.tbs.purecolorcollector.databinding.ColorFragmentBinding
import com.tbs.purecolorcollector.databinding.MainFragmentBinding

/**
 * author jingting
 * date : 2021/11/84:41 下午
 */
class ColorFragment : BaseFragment() {

    private var _binding: ColorFragmentBinding?= null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = ColorFragmentBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}