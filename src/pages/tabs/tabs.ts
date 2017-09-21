import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { StartingPage } from '../starting/starting';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = StartingPage;
  tab2Root = ProfilePage;

  constructor(public navParams: NavParams) {

  }

  index = this.navParams.get('index');
}
