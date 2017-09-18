import { Component, ViewChild, ElementRef, NgZone, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DirectionsPage } from '../directions/directions';

import { Geolocation } from '@ionic-native/geolocation';

import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { } from '@types/googlemaps';


import { PlacesService } from "../../services/places.service";

@IonicPage()
@Component({
  selector: 'page-starting',
  templateUrl: 'starting.html',
})
export class StartingPage implements OnInit {
  customMarkerIcon: any;
  lat: number = 51.678418;
  lng: number = 7.809007;
  /**
   * Starting section
   */
  oringinObject: any;
  latStarting: number;
  lngStarting: number;
  formattedStartingAddress: string;
  /**
   * Ending section
   */
  placeToPass: any;
  latEnding: number;
  lngEnding: number;
  formattedEndingAddress: string;

  @ViewChild('searchOrigin', {read: ElementRef}) searchOriginBar: ElementRef;
  @ViewChild('searchDestination', {read: ElementRef}) searchDestinationBar: ElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private placesService: PlacesService,
    private geolocation: Geolocation,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    /**
     * seachinput variables
     */
    var searchOrigin = this.searchOriginBar.nativeElement.querySelector('.searchbar-input');
    console.log("Search input", searchOrigin);
    var searchDestination = this.searchDestinationBar.nativeElement.querySelector('.searchbar-input');
    console.log("Search input", searchOrigin);

    this.mapsAPILoader.load().then(
      () => {

        // Autocomplete for starting point.
        let autocomplete = new google.maps.places.Autocomplete(searchOrigin, { types: ['address'] });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            this.oringinObject = place;
            this.formattedStartingAddress = place.formatted_address;
            this.latStarting = place.geometry.location.lat();
            this.lngStarting = place.geometry.location.lng();
          })
        })

        // Autocomplete for Ending point.
        let autocompleteEnding = new google.maps.places.Autocomplete(searchDestination, { types: ['address'] });
        autocompleteEnding.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocompleteEnding.getPlace();
            this.placeToPass = place;
            this.formattedEndingAddress = place.formatted_address;
            this.latEnding = place.geometry.location.lat();
            this.lngEnding = place.geometry.location.lng();
            console.log(place);
            console.log(this.placeToPass);
            console.log(place.geometry.location)
          })
        })
      }
    )

    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('WORKS');
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      console.log(resp.coords.longitude);
      console.log(resp.coords.latitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartingPage');
  }

  onAddplace(value: { startingPoint: string, endingPoint: string }) {
    this.placesService.addPlace(value);
    this.navCtrl.pop();
  }

  onLocateUser() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('WORKS');
      this.customMarkerIcon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      console.log(resp.coords.longitude);
      console.log(resp.coords.latitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  /**
   * Next activity button
   * Passes to DirectionPage : origin and destination
   */
  showDirections(){
    this.navCtrl.push(DirectionsPage,{
      placeToPass: this.placeToPass,
      oringinObject: this.oringinObject
    });
  }

}
