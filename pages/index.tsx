import CustomHead from "../components/CustomHead";
import * as Styles from '../styles'
import fetch from 'isomorphic-unfetch';
import {EventFactory} from "../models/Event";
import dynamic from 'next/dynamic'

// Need to disable SSR for the map so we don't try to access the browser window on the server
const MapNoSSR = dynamic(
    () => import('../components/Map'),
    { ssr: false }
)


function Dashboard({events}){
    return (
        <div>
            <CustomHead/>
            <MapNoSSR events={events}/>
        </div>
    )
}

// @ts-ignore
Dashboard.getInitialProps = async function() : Promise<{ events: Array<Event>, loading: boolean, error: boolean }> {
    try {
        let res = await fetch('https://api.radar.io/v1/events', {
            headers: {
                'Authorization': 'org_test_sk_ec28329d6943dd4c0f663814570569b4470c03d9',
                'Content-Type': 'application/json'
            },
        });

        let { events } = await res.json();

        return {
            events: events.map(EventFactory.fromJSON),
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

export default Dashboard;
