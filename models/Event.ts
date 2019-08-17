import User from "./User";
import Geofence from "./Geofence";
import Place from "./Place";
import {GeoJSON} from "./GeoJSON";

export enum EventType {
    entered_geofence,
    exited_geofence,
    entered_place,
    exited_place
}

export default class Event {
    constructor(
        private _id: string,
        public createdAt: Date,
        private live : boolean,
        private type: EventType,
        private user: User,
        private geofence: Geofence,
        private place: Place,
        private alternatePlaces: Array<Place>,
        private verifiedPlace: Place,
        private location: GeoJSON,
        private locationAccuracy: number,
        private confidence: number,
        private duration: number,
        private verification: number,
    ) {}
}

/**
 *
 * EventFactory is responsible for checking the fields from the responses,
 * transforming data and creating correct Event instances
 *
 */

export class EventFactory {
    private _id : string;
    private createdAt : Date;
    private live : boolean;
    private  type : EventType;
    private  user : User;
    private  geofence : Geofence;
    private  place : Place;
    private  alternatePlaces : Array<Place>;
    private  verifiedPlace  : Place;
    private  location : GeoJSON;
    private  locationAccuracy : number;
    private  confidence : number;
    private  duration : number;
    private  verification : number;

    setId(id: string) { this._id = id; return this; }

    setCreatedAt(createdAt: string){ this.createdAt = new Date(createdAt); return this; }

    setLive(live: boolean){ this.live = live; return this; }

    setType(type: string){
        const eventType : EventType= EventType[type];
        this.type = eventType;
        return this;
    }

    setUser(user: User){ this.user = user; return this; }

    setGeofence(geofence : Geofence){ this.geofence = geofence; return this;}

    setPlace(place : Place){ this.place = place; return this; }

    setAlternatePlaces(alternatePlaces: Array<Place>){ this.alternatePlaces = alternatePlaces; return this; }

    setVerifiedPlace(verifiedPlace : Place){ this.verifiedPlace = verifiedPlace; return this; }

    setLocation(location: GeoJSON) { this.location = location; return this; }

    setLocationAccuracy(accuracy : number) { this.locationAccuracy = accuracy; return this; }

    setConfidence(confidence : number) { this.confidence = confidence; return this; }

    setDuration(duration : number) { this.duration = duration; return this; }

    setVerification(verification : number){ this.verification = verification; return this; }

    createEvent(){
        return new Event(
            this._id,
            this.createdAt,
            this.live,
            this.type,
            this.user,
            this.geofence,
            this.place,
            this.alternatePlaces,
            this.verifiedPlace,
            this.location,
            this.locationAccuracy,
            this.confidence,
            this.duration,
            this.verification
        );
    }

    static fromJSON(eventObj) : Event {
        let eventFactory = new EventFactory();
        return eventFactory.setId(eventObj._id)
            .setCreatedAt(eventObj.createdAt)
            .setLive(eventObj.live)
            .setType(eventObj.type)
            .setUser(eventObj.user)
            .setGeofence(eventObj.geofence)
            .setPlace(eventObj.place)
            .setAlternatePlaces(eventObj.alternatePlaces)
            .setVerifiedPlace(eventObj.verifiedPlace)
            .setLocation(eventObj.location)
            .setLocationAccuracy(eventObj.locationAccuracy)
            .setConfidence(eventObj.confidence)
            .setDuration(eventObj.duration)
            .setVerification(eventObj.verification)
            .createEvent();
    }
}


