import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';

// Pages section.
import { MyApp } from './app.component';
import { StartingPage } from '../pages/starting/starting';
import { DirectionsPage } from '../pages/directions/directions';
import { LoginPage } from '../pages/login/login'
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';

// Native services section.
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';
import { Diagnostic } from '@ionic-native/diagnostic';

// Angular maps section.
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MyApp,
    StartingPage,
    DirectionsPage,
    TabsPage,
    LoginPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCnVQtD5RchU0P1yO-48-C4SQHzx4EeZaE',
      libraries: ["places"]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartingPage,
    DirectionsPage,
    LoginPage,
    ProfilePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    Facebook,
    Diagnostic,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
