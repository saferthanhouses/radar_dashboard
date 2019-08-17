import {Component} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import Event from '../models/Event';

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
        const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

        const pinStyle = {
            cursor: 'pointer',
            fill: '#d00',
            stroke: 'none'
        };
        return (
            <ReactMapGL
                {...this.state.viewport}
                mapboxApiAccessToken={'pk.eyJ1Ijoiam9leW9saXZlciIsImEiOiJjaXJwcDViZ2kwZ3NjZmttNjE0azhiZGZnIn0.BVe9J_2_RAf6WO8DwVyNVQ'}
                onViewportChange={(viewport) => this.setState({viewport})}
            >
                {this.props.events.map( event => (
                    <Marker latitude={event.location.latitude} longitude={event.location.longitude}>
                        <svg
                            height={20}
                            viewBox="0 0 24 24"
                            style={{
                                ...pinStyle,
                                transform: `translate(${-20 / 2}px,${-20}px)`
                            }}
                        >
                            <path d={ICON} />
                        </svg>
                    </Marker>
                ))}
            </ReactMapGL>
        );
    }
}
