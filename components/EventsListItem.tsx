import Event from '../models/Event';


export default function EventsListItem(props: {event: Event}){
    return (
        <div>
            <div>
                <p>{props.event._id}</p>
            </div>
        </div>
    )
}
