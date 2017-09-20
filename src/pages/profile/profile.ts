import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoginPage } from '../../pages/login/login';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: any;
	userReady: boolean = false;

  constructor(
    public navCtrl: NavController, 
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
    var nav = this.navCtrl;
		let env = this;
    this.fb.logout()
      .then((response) =>{
        //user logged out so we will remove him from the NativeStorage
        this.nativeStorage.remove('user');
        this.appCtrl.getRootNav().setRoot(LoginPage);
      }, (error) =>{
        console.log(error);
      });
  }

}