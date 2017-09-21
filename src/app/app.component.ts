import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Native services 
import { NativeStorage } from '@ionic-native/native-storage';

// Imported Pages
import { LoginPage } from '../pages/login/login'
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public nativeStorage: NativeStorage) {

    platform.ready().then(() => {
      let env = this;
      // Check if the user is loged In with native storage item user.
      this.nativeStorage.getItem('user')
      .then( function (data) {
        // If the user is loged in redirect him to user profile page.
        // Make root page Tabs general page.
        env.nav.setRoot(TabsPage);
        env.nav.push(TabsPage, {index: "1"});
        splashScreen.hide();
      }, function (error) {
        // If he is not loged in bring in the Login Page.
        env.nav.setRoot(LoginPage);
        splashScreen.hide();
      });

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

