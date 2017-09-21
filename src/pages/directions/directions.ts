import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { FormControl } from '@angular/forms';


declare var google;


@IonicPage()
@Component({
  selector: 'page-directions',
  templateUrl: 'directions.html',
})
export class DirectionsPage implements OnInit {
  // Metrics
  totalDistance: any;
  totalTime: any;

  // Current location lat, lng
  currentLat: number;
  currentLng: number;

  // Initialize a custom marker
  customIconMarker = {
    url: 'https://lh6.ggpht.com/2kNvSeSXkJGXR-A9RBEq3qAMM7rdq7EQTf96fAoOf7H3EP2w4ZVmnOIN0p47AnBgAgU=w300',
    scaledSize:{
      height: 40,
      width: 40
    }
  };

  myLatlng = new google.maps.LatLng(-25.363882,131.044922);
  currentLocationMarker = new google.maps.Marker({
        icon : this.customIconMarker,
        position: this.myLatlng,
        title: "Current location"
      });

  constructor(
    private navController: NavController, 
    private navParams: NavParams,
    private geolocation: Geolocation) {}

  /**
   * Get parameters from last activity starting.ts
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
    // console.log('DESTINATION')
    // console.log(this.endingPlace.geometry.location);
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
    // Initialize currentlocation Marker
    this.currentLocationMarker.setMap(this.map);
  }

  displayLocation() {
    // Get current user lcoation.
    this.geolocation.getCurrentPosition().then((resp) => {
      // console.log('WORKS');
      // console.log(resp);
      this.currentLat = resp.coords.latitude;
      this.currentLng = resp.coords.longitude;
      // Create new marker for current users location.
      var newLatLng = new google.maps.LatLng(this.currentLat, this.currentLng);
      var marker = new google.maps.Marker({
        icon : this.customIconMarker,
        position: newLatLng,
        title: "Current location"
      });
      // Include the marker to the map.
      // marker.setMap(this.map);
      this.currentLocationMarker.setPosition(newLatLng);

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  

}
