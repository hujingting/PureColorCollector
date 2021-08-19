package com.tbs.purecolorcollector

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
import com.tbs.purecolorcollector.databinding.MainActivityBinding
import com.tbs.purecolorcollector.ui.main.MainFragment
import com.tbs.common.utils.ScreenUtils
import com.tbs.purecolorcollector.utils.HexColorUtil
import com.tbs.purecolorcollector.utils.common.utils.BitmapUtil
import com.tbs.purecolorcollector.utils.common.utils.FileUtils
import java.util.*

class MainActivity : AppCompatActivity() {

    private lateinit var binding: MainActivityBinding
    private var currentColor : String = "#00F9FF"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = MainActivityBinding.inflate(layoutInflater)
        val view = binding.root
        setContentView(view)

        setSupportActionBar(binding.toolbar)

        if (savedInstanceState == null) {
            supportFragmentManager.beginTransaction()
                .replace(R.id.container, MainFragment.newInstance())
                .commitNow()
        }
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
                Toast.makeText(this, "已设置", Toast.LENGTH_SHORT).show()
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
                FileUtils.saveImageToMediaStore(this, file)

                Toast.makeText(this, "已保存", Toast.LENGTH_SHORT).show()
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