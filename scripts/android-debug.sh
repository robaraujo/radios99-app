react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

cd android/
./gradlew assembleDebug
cd ../

~/Library/Android/sdk/platform-tools/adb install android/app/build/outputs/apk/debug/app-debug.apk 