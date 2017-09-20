# Description: 
This is an android application project based on:
* [Ionic Framework](https://ionicframework.com/)
* [Google Maps API](https://developers.google.com/maps/)
* [Facebook API](https://developers.facebook.com/)
At first you must have a facebook account to log in.
Application's main functionality is to find the distance and the travel time between 2 places of your choice.


## Getting Started:

First `git clone` the project in your local machine,  `cd ` into the main directory and then `npm install ` to install any external dependencies.

## Running:

The application make use of [ionic native](https://ionicframework.com/docs/native/) wrapper. The best way to run the application is with your android device or with an emulator.

### Android device debugging:

* Make sure that you have [Android studio](https://developer.android.com/studio/index.html) correctly installed on your pc.
* Go to the root file of the project and type `ionic cordova run android --device`.

If you see an error for the ANDROID_HOME variable and the `android` command make sure that you type the following in your terminal:

* `export ANDROID_HOME= path to the sdk folder`
* `export PATH=$PATH:/ path to the tools folder inside sdk`
* `export PATH=$PATH:/ path to the platform tools folder inside sdk`

To check that everything is ready type `android` command in your terminal. If it opens android sdk you are ready to go.


## Build & Publish: 

To generate a release build for Android, you can use the following cordova cli command in your project root file:

`$ ionic cordova build --release android`

You can find the *APK* file in `platforms/android/build/outputs/apk`.

