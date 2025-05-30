package com.tbs.purecolorcollector.ui.main

import android.annotation.SuppressLint
import android.app.Activity.RESULT_OK
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.Color
import android.graphics.drawable.BitmapDrawable
import android.net.Uri
import android.os.Bundle
import android.text.Editable
import android.text.TextUtils
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.luck.picture.lib.PictureSelector
import com.luck.picture.lib.config.PictureConfig
import com.luck.picture.lib.config.PictureMimeType
import com.luck.picture.lib.entity.LocalMedia
import com.luck.picture.lib.listener.OnResultCallbackListener
import com.skydoves.colorpickerview.ColorEnvelope
import com.skydoves.colorpickerview.listeners.ColorEnvelopeListener
import com.tbs.purecolorcollector.ui.MainActivity
import com.tbs.purecolorcollector.R
import com.tbs.purecolorcollector.databinding.MainFragmentBinding
import com.tbs.common.utils.StatusBarUtils
import com.tbs.purecolorcollector.base.BaseFragment
import com.tbs.purecolorcollector.utils.GlideEngine
import com.tbs.purecolorcollector.utils.HexColorUtil
import java.io.File


class MainFragment : BaseFragment<MainFragmentBinding>() {

    private val REQUEST_CODE_CHOOSE = 23

    companion object {
        fun newInstance() = MainFragment()
    }

    private lateinit var viewModel: MainViewModel


    override fun addViewListener() {

        binding.tvShowColor.addTextChangedListener(object : TextWatcher {

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {

            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {

            }

            override fun afterTextChanged(s: Editable?) {

                val color = "#" + s.toString()

                if (HexColorUtil.validate(color)) {
//                    toast("请输入正确的色值", Toast.LENGTH_SHORT)
                    StatusBarUtils.setColor(requireActivity(), Color.parseColor(color))
                    (activity as MainActivity).setToolBarBg(Color.parseColor(color))
                }

//                binding.main.setBackgroundColor(Color.parseColor(color))

                if (activity != null) {
                    (activity as MainActivity).setCurrentColor(color)
                }

            }

        })

        /**
         * 选中颜色回调
         */
        binding.colorPickerView.setColorListener(object : ColorEnvelopeListener {
            override fun onColorSelected(envelope: ColorEnvelope?, fromUser: Boolean) {
//                envelope?.let { binding.tvShowColor.setBackgroundColor(it.color) }
//                binding.tvShowColor.setText("#" + envelope?.hexCode)
                viewModel.currentColor.value = envelope

//                envelope?.let { binding.toolbar.setBackgroundColor(it.color) }
//                if (activity is MainActivity) {
//                    envelope?.let { (activity as MainActivity).setToolBarBg(it.color) }
//                    (activity as MainActivity).setCurrentColor("#" + envelope?.hexCode)
//                }
            }
        })

        binding.colorPickerView.attachAlphaSlider(binding.alphaSlideBar)
        binding.colorPickerView.attachBrightnessSlider(binding.brightnessSlideBar)
        binding.colorPickerView.setLifecycleOwner(this)

        /**
         * 去相册
         */
        binding.tvChoosePhoto.setOnClickListener {

            PictureSelector.create(this)
                .openGallery(PictureMimeType.ofImage())//显示的媒体类型
                .imageEngine(GlideEngine.createGlideEngine())//图片加载引擎
                .selectionMode(PictureConfig.SINGLE)//单选
                .isCamera(true)//是否显示拍照按钮
                .isEnableCrop(true)//是否开启裁剪
                .hideBottomControls(false)
                .forResult(object : OnResultCallbackListener<LocalMedia> {
                    override fun onResult(result: MutableList<LocalMedia>?) {

                        if (result?.size == 0) {
                            return
                        }

                        val localMedia = result?.get(0);
                        var imagePath: String
                        if (localMedia?.isCompressed == true) {
                            imagePath = localMedia.compressPath
                        } else if (localMedia?.isCut == true) {
                            imagePath = localMedia.cutPath
                        } else {
                            imagePath = localMedia?.path.toString()
                        }

                        if (TextUtils.isEmpty(imagePath)) {
                            return
                        }

                        val file = File(imagePath)
                        val selectedUri = Uri.fromFile(file)
                        val selectImage = selectedUri?.let { activity?.contentResolver?.openInputStream(it) }
                        val drawable = BitmapDrawable(resources, selectImage)
                        binding.colorPickerView.setPaletteDrawable(drawable)

                    }

                    override fun onCancel() {
                    }

                })
        }

        /**
         * 点击色盘
         */
        binding.tvColorWheel.setOnClickListener {
            binding.colorPickerView.setHsvPaletteDrawable()
        }

        /**
         * 设置默认实例图片
         */
        binding.colorPickerView.setPaletteDrawable(context?.getDrawable(R.drawable.big_mouth_bird))

        /**
         * 解析默认图片主题色
         */
//        val bitmap = BitmapFactory.decodeResource(resources, R.drawable.big_mouth_bird)
//        createPaletteAsync(bitmap)

    }

    @SuppressLint("UseCompatLoadingForDrawables")
    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(MainViewModel::class.java)
        // TODO: Use the ViewModel

        /**
         * 观察 LiveData 对象
         */
        viewModel.currentColor.observe(viewLifecycleOwner, Observer {

            binding.tvShowColor.setText(it.hexCode)

//            binding.main.setBackgroundColor(it.color)

            it?.let { StatusBarUtils.setColor(requireActivity(), it.color) }

            if (activity is MainActivity) {
                it?.let { (activity as MainActivity).setToolBarBg(it.color) }
                (activity as MainActivity).setCurrentColor("#" + it?.hexCode)
            }
        })


    }

    private fun createPaletteAsync(bitmap: Bitmap) {

//        Palette.from(bitmap).generate {
//            val color = it?.getLightVibrantColor(Color.BLACK)
//            if (color != null) {
//                binding.tvPalette.setBackgroundColor(color)
//            }
//        }
    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == REQUEST_CODE_CHOOSE) {
            if (resultCode == RESULT_OK) {

//                val selectedUri = Matisse.obtainResult(data)[0]
//                val selectImage = selectedUri?.let { activity?.contentResolver?.openInputStream(it) }
//                val drawable = BitmapDrawable(resources, selectImage)
//                binding.colorPickerView.setPaletteDrawable(drawable)
//                createPaletteAsync(drawable.bitmap)
            }
        }
    }

}