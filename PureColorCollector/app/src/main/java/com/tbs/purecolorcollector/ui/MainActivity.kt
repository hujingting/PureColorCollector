package com.tbs.purecolorcollector.ui

import android.app.WallpaperManager
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.TextUtils
import android.view.Menu
import android.view.MenuItem
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.tbs.common.model.GeneralResultP
import com.tbs.common.net.RequestServiceUtil
import com.tbs.common.utils.AndroidVersion
import com.tbs.purecolorcollector.databinding.MainActivityBinding
import com.tbs.purecolorcollector.ui.main.MainFragment
import com.tbs.common.utils.ScreenUtils
import com.tbs.common.utils.toast
import com.tbs.doSelected
import com.tbs.initFragment
import com.tbs.purecolorcollector.R
import com.tbs.purecolorcollector.controller.WanController
import com.tbs.purecolorcollector.ui.color.ColorFragment
import com.tbs.purecolorcollector.utils.HexColorUtil
import com.tbs.purecolorcollector.utils.common.utils.BitmapUtil
import com.tbs.purecolorcollector.utils.common.utils.FileUtils
import java.util.*
import java.util.function.Consumer
//import com.tbs.purecolorcollector.utils.common.utils.FileUtils

class MainActivity : AppCompatActivity() {

    private lateinit var binding: MainActivityBinding
    private var currentColor : String = "#00F9FF"
    private val fragmentList = arrayListOf<Fragment>()

    private val mainFragment by lazy {
        MainFragment()
    }

    private val colorFragment by lazy {
        ColorFragment()
    }

    init {
        fragmentList.apply {
            add(mainFragment)
            add(colorFragment)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = MainActivityBinding.inflate(layoutInflater)
        val view = binding.root
        setContentView(view)

        setSupportActionBar(binding.toolbar)

        binding.vpHome.initFragment(supportFragmentManager, fragmentList).run {
            //全部缓存,避免切换回重新加载
            offscreenPageLimit = fragmentList.size
        }

        binding.vpHome.doSelected {
            binding.bottomNV.menu.getItem(it).isChecked = true
        }

//        binding.vpHome.initFragment(supportFragmentManager)
//        if (savedInstanceState == null) {
//            supportFragmentManager.beginTransaction()
//                .replace(R.id.container, MainFragment.newInstance())
//                .commitNow()
//        }

        binding.bottomNV.setOnItemSelectedListener {
            when(it.itemId) {
                R.id.menu_home -> binding.vpHome.setCurrentItem(0,false)
                R.id.menu_project -> binding.vpHome.setCurrentItem(1, false)
            }
            true
        }

        WanController.getComments()?.subscribe {

        }?.isDisposed

    }

    fun setToolBarBg(color: Int) {
        binding.toolbar.setBackgroundColor(color)
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem) = when (item.itemId) {

        R.id.action_settings -> {

            if (!HexColorUtil.validate(currentColor)) {
                Toast.makeText(this, "请输入正确的色值", Toast.LENGTH_SHORT).show()
            } else {
                val bitmap = Bitmap.createBitmap(ScreenUtils.screenWidth, ScreenUtils.screenHeight, Bitmap.Config.RGB_565)
                val canvas = Canvas(bitmap)
                canvas.drawColor(Color.parseColor(currentColor))

                val wallpaperManager = WallpaperManager.getInstance(baseContext)
                wallpaperManager.setBitmap(bitmap)
                Toast.makeText(this, "已设置桌面和锁屏壁纸", Toast.LENGTH_SHORT).show()
            }

            true
        }

        R.id.action_download -> {

            if (!HexColorUtil.validate(currentColor)) {
                Toast.makeText(this, "请输入正确的色值", Toast.LENGTH_SHORT).show()
            } else {
                val bitmap = Bitmap.createBitmap(ScreenUtils.screenWidth, ScreenUtils.screenHeight, Bitmap.Config.RGB_565)
                val canvas = Canvas(bitmap)
                canvas.drawColor(Color.parseColor(currentColor))

                val imagePathString = FileUtils.getFilePath(this, UUID.randomUUID().toString() + "_" + currentColor + ".png")
                val file = BitmapUtil.saveBitmapToFile(bitmap, imagePathString)
                FileUtils.saveImage(bitmap, UUID.randomUUID().toString() + "_" + currentColor);

                Toast.makeText(this, "已保存", Toast.LENGTH_SHORT).show()
            }

            true
        }

        R.id.action_settings_desktop -> {
            if (!HexColorUtil.validate(currentColor)) {
                toast("请输入正确的色值", Toast.LENGTH_SHORT)
            } else {
                val bitmap = Bitmap.createBitmap(ScreenUtils.screenWidth, ScreenUtils.screenHeight, Bitmap.Config.RGB_565)
                val canvas = Canvas(bitmap)
                canvas.drawColor(Color.parseColor(currentColor))

                val wallpaperManager = WallpaperManager.getInstance(baseContext)
                /**
                 * Android N之后可以分开设定锁屏和桌面壁纸
                 */
                if (AndroidVersion.hasNougat()) {
                    wallpaperManager.setBitmap(bitmap, null, true, WallpaperManager.FLAG_SYSTEM)
                    toast("已设置桌面壁纸", Toast.LENGTH_SHORT)
                } else {
                    wallpaperManager.setBitmap(bitmap)
                    toast("已设置桌面和锁屏壁纸", Toast.LENGTH_SHORT)
                }
            }
            true
        }

        R.id.action_settings_lock_screen -> {
            if (!HexColorUtil.validate(currentColor)) {
                toast("请输入正确的色值", Toast.LENGTH_SHORT)
            } else {
                val bitmap = Bitmap.createBitmap(ScreenUtils.screenWidth, ScreenUtils.screenHeight, Bitmap.Config.RGB_565)
                val canvas = Canvas(bitmap)
                canvas.drawColor(Color.parseColor(currentColor))

                val wallpaperManager = WallpaperManager.getInstance(baseContext)
                /**
                 * Android N之后可以分开设定锁屏和桌面壁纸
                 */
                if (AndroidVersion.hasNougat()) {
                    wallpaperManager.setBitmap(bitmap, null, true, WallpaperManager.FLAG_LOCK)
                    toast("已设置锁屏壁纸", Toast.LENGTH_SHORT)
                } else {
                    wallpaperManager.setBitmap(bitmap)
                    toast("已设置桌面和锁屏壁纸", Toast.LENGTH_SHORT)
                }
            }
            true
        }

        else -> {
            // If we got here, the user's action was not recognized.
            // Invoke the superclass to handle it.
            super.onOptionsItemSelected(item)
        }

    }

    fun setCurrentColor(color: String) {

        if (TextUtils.isEmpty(color)) {
            return
        }

        currentColor = color
    }

}