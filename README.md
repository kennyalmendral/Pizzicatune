# Pizzicatune

A simple violin tuner app that outputs real plucked (pizzicato) string sound.

## Generate Keystore

```
keytool -genkey -v -keystore Pizzicatune.keystore -alias PizzicatuneKeystore -keyalg RSA -keysize 2048 -validity 10000
```

**Password:** nfs2se

**First and Last Name:** Kenny Almendral

**Organizational Unit:** None

**Organization:** None

**City:** Baguio City

**State:** Benguet

**Country Code:** PH

## Generate Release APK Binary

```
ionic cordova build android --prod --release
```

## Sign the Binary

```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore Pizzicatune.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk PizzicatuneKeystore
```

**Keystore Password:** nfs2se

## Optimize the Binary for Release

```
zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk Pizzicatune0.0.2.apk
```
