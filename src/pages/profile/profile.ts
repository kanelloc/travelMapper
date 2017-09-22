import { Component } from '@angular/core';
import { IonicPage, NavParams, App } from 'ionic-angular';

import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoginPage } from '../../pages/login/login';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  // UserReady to ngIf in content.
  user: any;
  userReady: boolean = false;

  constructor( 
    public navParams: NavParams,
    public fb: Facebook,
    public nativeStorage: NativeStorage,
    public appCtrl: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
    let env = this;
    this.nativeStorage.getItem('user')
    .then(function (data){
      // Store user information in user variable.
      env.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };
      env.userReady = true;
    }, function(error){
      console.log(error);
    });
  }

  fbLogoutButton(){
    this.fb.logout()
      .then((response) =>{
        // User logged out so remove him from the NativeStorage.
        // Redirect user after logout to login page.
        this.nativeStorage.remove('user');
        this.appCtrl.getRootNav().setRoot(LoginPage);
      }, (error) =>{
        console.log(error);
      });
  }

}
