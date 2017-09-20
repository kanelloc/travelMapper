import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { ProfilePage } from '../../pages/profile/profile';
import { TabsPage } from '../../pages/tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb: Facebook,
    public nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  fbLoginButton(){

    let permissions = new Array<string>();
    let nav = this.navCtrl;
    let env = this;
    // The permissions your facebook app needs from the user.
    permissions = ['public_profile', 'user_friends', 'email'];

  

    this.fb.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      // Getting name and gender properties
      env.fb.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        // Save use information in native storage.
        env.nativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          nav.push(TabsPage, {index: "1"});
        }, function (error) {
          console.log(error);
        })
      })
    }, function(error){
      console.log(error);
    });
  }

}
