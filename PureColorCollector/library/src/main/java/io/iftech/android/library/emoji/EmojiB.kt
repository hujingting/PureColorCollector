package io.iftech.android.library.emoji

/**
 * @escription emoji
 */
class EmojiB(var id: String, var tag: String, var name: String) {

    val path: String?
        get() = "file:///android_asset/default/$name"

}