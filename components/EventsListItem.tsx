import LocationEvent, {EventType} from '../models/LocationEvent';
import * as Styles from '../styles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt, faSignInAlt} from "@fortawesome/pro-regular-svg-icons";
import {faMapMarkerAlt, faMapMarkerAltSlash} from "@fortawesome/pro-solid-svg-icons"

const getEventTypeIcon = (eventType : EventType) : any => {
    switch (eventType){
        case EventType["user.entered_geofence"]:
            return faSignInAlt;
        case EventType["user.entered_place"]:
            return faMapMarkerAlt;
        case EventType["user.exited_geofence"]:
            return faSignOutAlt;
        case EventType["user.exited_place"]:
            return faMapMarkerAltSlash;
    }
};

export default function EventsListItem(props: {event: LocationEvent}){
    const eventName = EventType[props.event.type];
    return (
        <div className={"event-list-item"} key={props.event._id}>
            <div>
                <div className={"row align-center top"}>
                    <div className={"icon"}>
                        <FontAwesomeIcon icon={getEventTypeIcon(props.event.type)}/>
                    </div>
                    <p className={"event-name"}>{eventName}</p>
                    <p className={"time-container"}><time>{props.event.getShortTime()}</time></p>
                </div>
            </div>
            <style jsx>{`
                .event-list-item {
                    padding: 0.25rem 0.5rem;
                    margin: 0.25rem;
                    background-color: white;
                    cursor: pointer;
                    transition: 0.22s ease-in-out box-shadow, 0.22s ease-in-out transform;
                }

                .event-list-item:hover {
                    box-shadow: ${Styles.boxShadowRegular};
                    transform: translateY(-1px);
                }

                .event-list-item .time-container {
                    margin-left: auto;
                }

                .event-list-item time {
                    font-size: ${Styles.subtextFontSize};
                }

                .event-list-item .top {
                    margin: 0.5rem 0.25rem;
                }

                .icon {
                    background: ${Styles.eventColors[eventName]};
                }

                .event-name {
                    font-weight: 800;
                    margin-left: 0.75rem;
                    font-size: 1rem;
                    line-height: 1.5rem;
                }

            `}</style>
        </div>
    )
}
