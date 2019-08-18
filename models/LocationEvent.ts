import User from "./User";
import Geofence from "./Geofence";
import Place from "./Place";
import {Point} from "./Point";
import {padTwo} from "../utils";

export enum EventType {
    'user.entered_geofence',
    'user.exited_geofence',
    'user.entered_place',
    'user.exited_place'
}

export default class LocationEvent {
    private _shortTime: string;

    constructor(
        public _id: string,
        public createdAt: Date,
        private live : boolean,
        public type: EventType,
        private user: User,
        private geofence: Geofence,
        private place: Place,
        private alternatePlaces: Array<Place>,
        private verifiedPlace: Place,
        public location: Point,
        private locationAccuracy: number,
        private confidence: number,
        private duration: number,
        private verification: number,
    ) {
        this._shortTime = this._createShortTime();
    }

    public getShortTime() : string {
        return this._shortTime;
    }

    public getTypeString() : string {
        return EventType[this.type];
    }

    private _createShortTime() : string {
        return padTwo(this.createdAt.getMonth()) + '/'
            + padTwo(this.createdAt.getDate()) + '/'
            + this.createdAt.getFullYear() + ' '
            + padTwo(this.createdAt.getHours()) + ':'
            + padTwo(this.createdAt.getMinutes()) + ':'
            + padTwo(this.createdAt.getSeconds());
    }
}

/**
 *
 * EventFactory is responsible for checking the fields from the responses,
 * transforming data and creating correct LocationEvent instances
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
    private  location : Point;
    private  locationAccuracy : number;
    private  confidence : number;
    private  duration : number;
    private  verification : number;

    setId(id: string) { this._id = id; return this; }

    setCreatedAt(createdAt: string){
        this.createdAt = new Date(createdAt);
        return this;
    }

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

    setLocation(location: {coordinates: [number, number]}) {
        let locationPoint = new Point(location.coordinates[1],location.coordinates[0]);
        this.location = locationPoint;
        return this;
    }

    setLocationAccuracy(accuracy : number) { this.locationAccuracy = accuracy; return this; }

    setConfidence(confidence : number) { this.confidence = confidence; return this; }

    setDuration(duration : number) { this.duration = duration; return this; }

    setVerification(verification : number){ this.verification = verification; return this; }

    createEvent(){
        return new LocationEvent(
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

    static fromJSON(eventObj) : LocationEvent {
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


