import { Storage } from '@ionic/storage';

export class PlacesService{
    private places: {startingPoint: string, endingPoint: string}[] = [];


    addPlace(place: {startingPoint: string, endingPoint: string}) {
        this.places.push(place);
    }

    getPlaces(){
        return this.places.slice();
    }
}