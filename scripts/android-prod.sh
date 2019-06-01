Add signing config to android/app/build.gradle
android {
signingConfigs {
release {
storeFile file(MYAPP_RELEASE_STORE_FILE)
storePassword MYAPP_RELEASE_STORE_PASSWORD
keyAlias MYAPP_RELEASE_KEY_ALIAS
keyPassword MYAPP_RELEASE_KEY_PASSWORD
}
}
buildTypes {
release {
signingConfig signingConfigs.release
}
}
}


add to /node_modules/react-native/react.gradle
after doFirst { ... }

doLast {
    def moveFunc = { resSuffix ->
        File originalDir = file("$buildDir/generated/res/react/release/drawable-${resSuffix}");
        if (originalDir.exists()) {
            File destDir = file("$buildDir/../src/main/res/drawable-${resSuffix}");
            ant.move(file: originalDir, tofile: destDir);
        }
    }
    moveFunc.curry("ldpi").call()
    moveFunc.curry("mdpi").call()
    moveFunc.curry("hdpi").call()
    moveFunc.curry("xhdpi").call()
    moveFunc.curry("xxhdpi").call()
    moveFunc.curry("xxxhdpi").call()
}

cd android && ./gradlew assembleRelease
android/app/build/outputs/apk/