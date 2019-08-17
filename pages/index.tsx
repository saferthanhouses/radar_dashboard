import CustomHead from "../components/CustomHead";
import * as Styles from '../styles'
import fetch from 'isomorphic-unfetch';
import {EventFactory} from "../models/Event";

function Dashboard({events}){
    return (
        <div style={{padding: Styles.defaultPadding}}>
            <CustomHead/>
            <h1>Welcome To The Events Dashboard</h1>
            { events.map( event => (
                <div>{event._id}</div>
            )) }
        </div>
    )
}

// @ts-ignore
Dashboard.getInitsialProps = async function() : Promise<{ events: Array<Event> }> {
    try {
        let res = await fetch('https://api.radar.io/v1/events', {
            headers: {
                'Authorization': 'org_test_sk_ec28329d6943dd4c0f663814570569b4470c03d9',
                'Content-Type': 'application/json'
            },
        });

        let { events }= await res.json();
        return {
            events: events.map(EventFactory.fromJSON)
        }
    } catch (error){
        console.log("error", error);
    }
};

export default Dashboard;
