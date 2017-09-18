import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StartingPage } from '../../pages/starting/starting';

import { PlacesService } from "../../services/places.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  places: {startingPoint: string, endingPoint: string}[] = [];

  constructor(
    public navCtrl: NavController,
    private placesService: PlacesService) {

  }

  ionViewWillEnter(){
     this.places = this.placesService.getPlaces();
     console.log(this.places);
  }

  onLoadNewTrip(){
    this.navCtrl.push(StartingPage);
  }

}
