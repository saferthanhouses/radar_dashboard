import {Component} from 'react';
import ReactMapGL, {FlyToInterpolator} from 'react-map-gl';
import LocationEvent from '../models/LocationEvent';
// @ts-ignore
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

                // TODO: replace the hardcoded bounding box with a viewport bounding box transition when the events load
                latitude: 40.7591704,
                longitude: -74.0392706,
                zoom: 8
            }
        };

        this.resizeMapViewport = this.resizeMapViewport.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        this.onViewportChange = this.onViewportChange.bind(this)
    }

    /**
     * Add and remove window event listeners when the component is created and destroyed to prevent memory leaks
     */

    componentDidMount(){
        window.addEventListener('resize', this.resizeMapViewport)
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.resizeMapViewport)
    }

    componentDidUpdate(prevProps : MapProps){
        if (this.props.selected && prevProps.selected &&
            this.props.selected._id !== prevProps.selected._id){
            this.goToEvent(this.props.selected);
        }
    }

    resizeMapViewport(){
        window.addEventListener('resize', ()=>{
            this.onViewportChange({
                width: window.innerWidth,
                height: window.innerHeight
            });
        })
    }

    onViewportChange(viewport) {
        this.setState({
            viewport: {...this.state.viewport, ...viewport}
        });
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

    onMapClick(e){
        let clickedEvents = e.features.filter( (feature) => !!feature.properties.id);
        if (clickedEvents.length){
            let selectedEvent = this.props.events.filter( (event) =>
                event._id === clickedEvents[0].properties.id)[0];

            this.props.onEventSelected(selectedEvent);
        }
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

    render() {

        let mapStyle = this.updateMapStyle(this.props.events);

        // With more time would separate the configuration (auth token) and the code
        return (
            <ReactMapGL
                {...this.state.viewport}
                mapStyle={mapStyle}
                mapboxApiAccessToken={'pk.eyJ1Ijoiam9leW9saXZlciIsImEiOiJjaXJwcDViZ2kwZ3NjZmttNjE0azhiZGZnIn0.BVe9J_2_RAf6WO8DwVyNVQ'}
                onViewportChange={(viewport) => this.setState({viewport})}
                onClick={this.onMapClick}
            >
            </ReactMapGL>
        );
    }
}
