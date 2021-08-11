package com.tbs.purecolorcollector.ui.main

import android.annotation.SuppressLint
import android.app.Activity.RESULT_OK
import android.content.ContentResolver
import android.content.Context
import android.content.Intent
import android.graphics.drawable.BitmapDrawable
import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.skydoves.colorpickerview.ColorEnvelope
import com.skydoves.colorpickerview.listeners.ColorEnvelopeListener
import com.tbs.purecolorcollector.R
import com.tbs.purecolorcollector.databinding.MainFragmentBinding

class MainFragment : BaseFragment() {

    companion object {
        fun newInstance() = MainFragment()
    }

    private lateinit var viewModel: MainViewModel

    private var _binding : MainFragmentBinding? = null
    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = MainFragmentBinding.inflate(inflater, container, false)
        return binding.root
    }

    @SuppressLint("UseCompatLoadingForDrawables")
    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(MainViewModel::class.java)
        // TODO: Use the ViewModel

        binding.colorPickerView.setColorListener(object : ColorEnvelopeListener {
            override fun onColorSelected(envelope: ColorEnvelope?, fromUser: Boolean) {
                envelope?.let { binding.tvShowColor.setBackgroundColor(it.color) }
                binding.tvShowColor.setText("#" + envelope?.hexCode)
            }
        })

        binding.colorPickerView.attachAlphaSlider(binding.alphaSlideBar)
        binding.colorPickerView.attachBrightnessSlider(binding.brightnessSlideBar)
        binding.colorPickerView.setLifecycleOwner(this)

        binding.tvChoosePhoto.setOnClickListener {
            val intent = Intent(Intent.ACTION_PICK)
            intent.type = "image/*"
            startActivityForResult(intent, 1000)
        }

        binding.tvColorWheel.setOnClickListener {
            binding.colorPickerView.setHsvPaletteDrawable()
        }

        binding.colorPickerView.setPaletteDrawable(context?.getDrawable(R.drawable.big_mouth_bird))
    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == 1000) {
            if (resultCode == RESULT_OK) {
                val imageUri = data?.data
                val selectImage = imageUri?.let { activity?.contentResolver?.openInputStream(it) }
                val drawable = BitmapDrawable(resources, selectImage)
                binding.colorPickerView.setPaletteDrawable(drawable)
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

}