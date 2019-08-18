import {Component} from 'react';
import ReactMapGL, {FlyToInterpolator} from 'react-map-gl';
import LocationEvent from '../models/LocationEvent';
import MAP_STYLE from '../map-style.json';
import {fromJS} from 'immutable';
import * as Styles from '../styles'
import * as React from "react";


interface MapProps {
    events : Array<LocationEvent>
    selected: LocationEvent;
    onEventSelected : any
}

interface MapState {
    viewport: {
        width: number,
        height: number,
        latitude: number,
        longitude: number,
        zoom: number
    }
}

export default class Map extends Component<MapProps, MapState> {

    constructor(props: MapProps) {
        super(props);
        this.state = {
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,

                latitude: 40.7591704,
                longitude: -74.0392706,
                zoom: 8
            }
        };

        this.updateMapViewport = this.updateMapViewport.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        this.onViewportChange = this.onViewportChange.bind(this)
    }

    /**
     *
     * We add the events as a layer to the map - this is MUCH more performant than adding to the DOM tree
     *
     */

    updateMapStyle(events: Array<LocationEvent>){
        let styleObj = {
            ...MAP_STYLE,
            sources: {
                ...MAP_STYLE.sources,
                events: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: []
                    }
                },
            },
            layers: [
                ...MAP_STYLE.layers,
                {
                    id: 'events-shadow-layer',
                    type: 'circle',
                    source: 'events',
                    paint: {
                        'circle-color': 'rgba(0,0,0,0.35)',
                        'circle-pitch-alignment': 'map',
                        'circle-blur': 0.5,
                        'circle-radius': [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            1,
                            4,
                            12,
                            12,
                            18,
                            58,
                            22,
                            120
                        ]
                    },
                },
                {
                    id: 'events-background-layer',
                    type: 'circle',
                    source: 'events',
                    paint: {
                        'circle-color': 'white',
                        'circle-pitch-alignment': 'map',
                        'circle-radius': [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            1,
                            4,
                            12,
                            11,
                            18,
                            54,
                            22,
                            110
                        ]
                    },
                },
                {
                    id: 'events-layer',
                    type: 'circle',
                    source: 'events',
                    paint: {
                        'circle-color': ['get', 'color'],
                        'circle-pitch-alignment': 'map',
                        'circle-radius': [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            1,
                            3,
                            12,
                            10,
                            18,
                            50,
                            22,
                            100
                        ]
                    },
                },
            ],
        };

        styleObj.sources.events.data.features = events.map( event => ({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [event.location.longitude, event.location.latitude]
            },
            properties: {
                color: Styles.eventColors[event.getTypeString()],
                id: event._id
            }
        }));

        return fromJS(styleObj)

    }

    updateMapViewport(){
        window.addEventListener('resize', ()=>{
            this.setState((state, props) => ({
                viewport: {
                    ...state.viewport,
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            }));
        })
    }

    onViewportChange = viewport =>
        this.setState({
            viewport: {...this.state.viewport, ...viewport}
        });

    onMapClick(e){
        let clickedEvents = e.features.filter( (feature) => !!feature.properties.id);
        if (clickedEvents.length){
            let selectedEvent = this.props.events.filter( (event) =>
                event._id === clickedEvents[0].properties.id)[0];

            this.props.onEventSelected(selectedEvent);
        }
    }

    componentWillReceiveProps(props: MapProps){
        this.goToEvent(props.selected);
    }

    goToEvent = (event : LocationEvent) => {
        this.onViewportChange({
            longitude: event.location.longitude,
            latitude: event.location.latitude,
            zoom: 17,
            transitionInterpolator: new FlyToInterpolator(),
            transitionDuration: 800
        });
    };

    componentDidMount(){
        window.addEventListener('resize', this.updateMapViewport)
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateMapViewport)
    }

    render() {
        let mapStyle = this.props.events.length ?
            this.updateMapStyle(this.props.events) :
            [];

        // With more time would separate the configuration (auth token) and the code
        return (
            <ReactMapGL
                {...this.state.viewport}
                mapStyle={mapStyle}
                mapboxApiAccessToken={'pk.eyJ1Ijoiam9leW9saXZlciIsImEiOiJjaXJwcDViZ2kwZ3NjZmttNjE0azhiZGZnIn0.BVe9J_2_RAf6WO8DwVyNVQ'}
                onViewportChange={this.onViewportChange}
                onClick={this.onMapClick}
            >
            </ReactMapGL>
        );
    }
}
