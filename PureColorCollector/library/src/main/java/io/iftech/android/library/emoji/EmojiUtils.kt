package io.iftech.android.library.emoji

import android.content.Context
import io.iftech.android.library.emoji.EmojiB
import io.iftech.android.library.emoji.EmojiUtils
import org.w3c.dom.Element
import org.xml.sax.SAXException
import java.io.IOException
import java.util.ArrayList
import javax.xml.parsers.DocumentBuilderFactory
import javax.xml.parsers.ParserConfigurationException

/**
 * @escription emoji util
 */
object EmojiUtils {
    var sEmojiBList: List<EmojiB>? = null
    fun loadEmoji(context: Context): List<EmojiB> {
        val emojiBS: MutableList<EmojiB> = ArrayList()
        try {
            val inputStream = context.assets.open("emoji.xml")
            val documentBuilderFactory = DocumentBuilderFactory.newInstance()
            val builder = documentBuilderFactory.newDocumentBuilder()
            val document = builder.parse(inputStream)
            val element = document.documentElement
            val nodeList = element.getElementsByTagName("Emoticon")
            for (i in 0 until nodeList.length) {
                val element1 = nodeList.item(i) as Element
                val tag = element1.getAttribute("Tag")
                val ID = element1.getAttribute("ID")
                val FIleName = element1.getAttribute("File")
                val emojiB = EmojiB(ID, tag, FIleName)
                emojiBS.add(emojiB)
            }
        } catch (e: IOException) {
        } catch (e: ParserConfigurationException) {
        } catch (e: SAXException) {
        }
        sEmojiBList = emojiBS
        return emojiBS
    }
}