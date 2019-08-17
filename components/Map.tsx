import {Component} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import Event from '../models/Event';
import MAP_STYLE from '../map-style.json';


interface MapProps {
    events : Array<Event>
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

import {fromJS} from 'immutable';

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
    }

    /**
     *
     * We add the events as a layer to the map - this is MUCH more performant than adding to the DOM tree
     *
     */

    updateMapStyle(events: Array<Event>){
        let styleObj = {
            ...MAP_STYLE,
            sources: {
                ...MAP_STYLE.sources,
                events: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                        ]
                    }
                },
            },
            layers: [
                ...MAP_STYLE.layers,
                {
                    id: 'events-layer',
                    type: 'circle',
                    source: 'events',
                    paint: {
                        'circle-color': '#f00',
                        'circle-radius': 4
                    },
                }
            ],
        };

        styleObj.sources.events.data.features = events.map( event => ({
            type: 'Feature', geometry: {type: 'Point', coordinates: [event.location.longitude, event.location.latitude]}
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

    componentDidMount(){
        window.addEventListener('resize', this.updateMapViewport)
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateMapViewport)
    }

    render() {
        let mapStyle = this.updateMapStyle(this.props.events);
        return (
            <ReactMapGL
                {...this.state.viewport}
                mapStyle={mapStyle}
                mapboxApiAccessToken={'pk.eyJ1Ijoiam9leW9saXZlciIsImEiOiJjaXJwcDViZ2kwZ3NjZmttNjE0azhiZGZnIn0.BVe9J_2_RAf6WO8DwVyNVQ'}
                onViewportChange={(viewport) => this.setState({viewport})}
            >
            </ReactMapGL>
        );
    }
}
