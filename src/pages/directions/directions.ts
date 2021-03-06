import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { FormControl } from '@angular/forms';

declare var google;

@IonicPage()
@Component({
  selector: 'page-directions',
  templateUrl: 'directions.html',
})
export class DirectionsPage implements OnInit {
  // Distance and time metrics.
  totalDistance: any;
  totalTime: any;

  // Current location lat, lng.
  currentLat: number;
  currentLng: number;

  // Initialize a custom styles marker.
  customIconMarker = {
    url: 'https://lh6.ggpht.com/2kNvSeSXkJGXR-A9RBEq3qAMM7rdq7EQTf96fAoOf7H3EP2w4ZVmnOIN0p47AnBgAgU=w300',
    scaledSize:{
      height: 40,
      width: 40
    }
  };
  // initialize the marker's settings.
  myLatlng = new google.maps.LatLng(-25.363882,131.044922);
  currentLocationMarker = new google.maps.Marker({
        icon : this.customIconMarker,
        position: this.myLatlng,
        title: "Current location"
      });

  constructor(
    private navController: NavController, 
    private navParams: NavParams,
    private geolocation: Geolocation,
    private diagnostic: Diagnostic,
    private platform: Platform) {}

  // Get parameters from last activity starting.ts
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
    this.initMap();

    // Show the directions for origin to destination.
    this.directionsService.route({
      origin: this.originPlace.geometry.location,
      destination: this.endingPlace.geometry.location,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        this.totalDistance = response.routes["0"].legs["0"].distance.text;
        this.totalTime = response.routes["0"].legs["0"].duration.text;
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

  enableLiveLocation(){
    this.platform.ready().then((readySource) => {
      // Check if GPS service is on.
      this.diagnostic.isLocationEnabled().then(
        (isAvailable) => {
          if (isAvailable == false) {
            alert('You must turn on GPS service');
            this.diagnostic.switchToLocationSettings();
          } else {
              // Get current user location with live update.
              this.geolocation.watchPosition().subscribe((resp) => {
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
                this.currentLocationMarker.setPosition(newLatLng);
                this.map.setCenter(newLatLng);
              }, (error) => {
                console.log('Error getting location', error);
              });
          }
        }).catch ((e) => {
          alert(JSON.stringify(e));
        });
    });
  }
  

}
