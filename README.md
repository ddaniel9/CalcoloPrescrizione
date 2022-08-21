# CalcoloPrescrizione

date picker:   npm install react-native-common-date-picker

select picker:
          npm install react-native-picker-select
          npm install @react-native-community/picker
          npm install @react-native-picker/picker
          npx react-native link


BUILD:
https://stackoverflow.com/questions/35935060/how-can-i-generate-an-apk-that-can-run-without-server-with-react-native
./gradlew clean
./gradlew assembleRelease
./gradlew assembleDebug
android/app/build/outputs/apk/app-release.apk, or android/app/build/outputs/apk/release/app-release.apk
adb install -r ./android/app/build/outputs/apk/release/app-release.apk

