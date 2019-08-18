import {Component} from "react";
import CustomHead from "../components/CustomHead";
import fetch from 'isomorphic-unfetch';
import LocationEvent, {EventFactory} from "../models/LocationEvent";
import dynamic from 'next/dynamic'
import EventsList from "../components/EventsList";

// Need to disable SSR for the map so we don't try to access the browser window on the server
const MapNoSSR = dynamic(
    () => import('../components/Map'),
    { ssr: false }
);

interface MapProps {
    events: Array<LocationEvent>;
}

interface MapState {
    selected: LocationEvent;
}

export default class Dashboard extends Component<MapProps, MapState> {
    constructor(props: MapProps){
        super(props);
        this.state = {
            selected: null,
        };
        this.setSelectedEvent = this.setSelectedEvent.bind(this);
    }

    static getInitialProps = async function() : Promise<{ events: Array<Event>, loading: boolean, error: boolean }> {
        try {
            let res = await fetch('https://api.radar.io/v1/events', {
                headers: {
                    'Authorization': 'org_test_sk_ec28329d6943dd4c0f663814570569b4470c03d9',
                    'Content-Type': 'application/json'
                },
            });

            let { events } = await res.json();

            return {
                events: events,
                loading: false,
                error: false
            }
        } catch (error){
            return {
                events: [],
                loading: false,
                error: true
            }
        }
    };

    setSelectedEvent(event : LocationEvent){
        this.setState({selected: event})
    }

    render(){
        // Data that is fetched in getInitialProps is JSONified during SSR and sent directly to the client - so we lose
        // our classes - which is why we're parsing the data here.
        let eventsParsed = this.props.events.map(EventFactory.fromJSON);

        return (
            <div>
                <CustomHead/>
                <MapNoSSR
                    events={eventsParsed}
                    selected={this.state.selected}
                    onEventSelected={this.setSelectedEvent}
                />
                <EventsList
                    events={eventsParsed}
                    selected={this.state.selected}
                    onEventSelected={this.setSelectedEvent}
                />
            </div>
        )
    }
}


