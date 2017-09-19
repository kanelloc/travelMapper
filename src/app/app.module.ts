import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StartingPage } from '../pages/starting/starting';
import { DirectionsPage } from '../pages/directions/directions';
import { LoginPage } from '../pages/login/login'
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';

// services
import { PlacesService } from "../services/places.service";
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';
//google maps
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
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
    HomePage,
    StartingPage,
    DirectionsPage,
    LoginPage,
    ProfilePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PlacesService,
    NativeStorage,
    Facebook,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
