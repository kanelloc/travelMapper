import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormControl } from '@angular/forms';


declare var google;

/**
 * Generated class for the DirectionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-directions',
  templateUrl: 'directions.html',
})
export class DirectionsPage implements OnInit {

  totalDistance: any;
  totalTime: any;

  constructor(private navController: NavController, private navParams: NavParams) {}

  /**
   * Get parameters from starting.ts
   */
  endingPlace = this.navParams.get('placeToPass');
  originPlace = this.navParams.get('oringinObject');

  @ViewChild('map') mapElement: ElementRef;
  
  map: any;
  
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectionsPage');
  }

  ngOnInit() {
    console.log('DESTINATION')
    console.log(this.endingPlace.geometry.location);
    this.initMap();

    /**
     * Show the distance between the 2 points
     */
    this.directionsService.route({
      origin: this.originPlace.geometry.location,
      destination: this.endingPlace.geometry.location,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        this.totalDistance = response.routes["0"].legs["0"].distance.text;
        this.totalTime = response.routes["0"].legs["0"].duration.text;
        console.log('TEST33');
        console.log(response.routes["0"].legs["0"]);
        console.log(this.totalDistance);

      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });

    this.directionsDisplay.setMap(this.map);
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.originPlace.geometry.location,
      destination: this.endingPlace.geometry.location,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        console.log('TEST');
        console.log(response.routes["0"].legs["0"].distance.text);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  

}
