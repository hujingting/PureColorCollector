package io.iftech.android.library.emoji

/**
 * @escription emoji
 */
class EmojiB(var iD: String, var tAG: String, var name: String) {
    val path: String?
        get() = "file:///android_asset/default/$name"
}