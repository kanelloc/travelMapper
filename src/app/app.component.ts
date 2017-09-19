import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Native services 
import { NativeStorage } from '@ionic-native/native-storage';

// Imported Pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  @ViewChild(Nav) nav: Nav;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public nativeStorage: NativeStorage) {

    platform.ready().then(() => {
      let env = this;
      // Here we will check if the user is already logged in
      // because we don't want to ask users to log in each time they open the app
      this.nativeStorage.getItem('user')
      .then( function (data) {
        // user is previously logged and we have his data
        // we will let him access the app

        env.nav.push(TabsPage, {index: "1"});
        splashScreen.hide();
      }, function (error) {
        env.nav.setRoot(LoginPage);
        splashScreen.hide();
      });

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

