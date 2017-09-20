import { Component, ViewChild, ElementRef, NgZone, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DirectionsPage } from '../directions/directions';

import { Geolocation } from '@ionic-native/geolocation';

import { MapsAPILoader } from '@agm/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { } from '@types/googlemaps';


import { PlacesService } from "../../services/places.service";

@IonicPage()
@Component({
  selector: 'page-starting',
  templateUrl: 'starting.html',
})
export class StartingPage implements OnInit {

  // Initialize a custom marker
  customIconMarker = {
    url: 'https://lh6.ggpht.com/2kNvSeSXkJGXR-A9RBEq3qAMM7rdq7EQTf96fAoOf7H3EP2w4ZVmnOIN0p47AnBgAgU=w300',
    scaledSize:{
      height: 40,
      width: 40
    }
  };
  // Initialize gps marker in map.
  lat: number = 51.678418;
  lng: number = 7.809007;

  /**
   * Origin Section
   */
  oringinObject: any;
  latStarting: number;
  lngStarting: number;
  formattedStartingAddress: string;

  /**
   * Destination Section
   */
  placeToPass: any;
  latEnding: number;
  lngEnding: number;
  formattedEndingAddress: string;

  /**
   * Form Section
   */
  private plannerForm: FormGroup;

  @ViewChild('searchOrigin', {read: ElementRef}) searchOriginBar: ElementRef;
  @ViewChild('searchDestination', {read: ElementRef}) searchDestinationBar: ElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private placesService: PlacesService,
    private geolocation: Geolocation,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private formBuilder: FormBuilder) { 
      this.plannerForm = this.formBuilder.group({
        startingPoint: ['', Validators.required],
        endingPoint: ['', Validators.required],
      });
    }

  ngOnInit() {
    /**
     * Variables for the search boxes.
     */
    var searchOrigin = this.searchOriginBar.nativeElement.querySelector('.searchbar-input');
    var searchDestination = this.searchDestinationBar.nativeElement.querySelector('.searchbar-input');

    this.mapsAPILoader.load().then(
      () => {

        // Autocomplete for origin search box.
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

        // Autocomplete for destination search box.
        let autocompleteEnding = new google.maps.places.Autocomplete(searchDestination, { types: ['address'] });
        autocompleteEnding.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocompleteEnding.getPlace();
            this.placeToPass = place;
            this.formattedEndingAddress = place.formatted_address;
            this.latEnding = place.geometry.location.lat();
            this.lngEnding = place.geometry.location.lng();
          })
        })
      }
    )

    // Get current user lcoation.
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('WORKS');
      console.log(resp);
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

  /**
   * Next activity button
   * Passes to DirectionPage : origin and destination
   */
  showDirections(){
    if (!this.oringinObject || !this.placeToPass ) {
      alert('+++++++++Errror+++++++++');

    } else{
        this.navCtrl.push(DirectionsPage,{
        placeToPass: this.placeToPass,
        oringinObject: this.oringinObject
      });
    }
    
  }

}
