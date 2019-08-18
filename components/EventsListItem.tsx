import LocationEvent, {EventType} from '../models/LocationEvent';
import * as Styles from '../styles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt, faSignInAlt} from "@fortawesome/pro-regular-svg-icons";
import {faMapMarkerAlt, faMapMarkerAltSlash} from "@fortawesome/pro-solid-svg-icons"
import {Component} from "react";
import * as React from "react";

interface EventsListItemProps {
    event: LocationEvent;
    selected: boolean;
    onEventSelected : any;
    scrollToItem : any;
}

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

export default class EventsListItem extends Component<EventsListItemProps> {
    private listItemRef: React.RefObject<any>;

    constructor(props: EventsListItemProps){
        super(props);
        this.listItemRef = React.createRef();
    }

    render(){
        let {event, selected, scrollToItem} = this.props;

        if (selected) scrollToItem(this.listItemRef.current);

        let className = "event-list-item";
        if (selected){
            className += " selected"
        }

        return (
            <div ref={this.listItemRef} className={className} key={event._id} onClick={()=>this.props.onEventSelected(event)}>
                <div>
                    <div className={"row align-center top"}>
                        <div className={"icon"}>
                            <FontAwesomeIcon icon={getEventTypeIcon(event.type)}/>
                        </div>
                        <p className={"event-name"}>{event.getTypeString()}</p>
                        <p className={"time-container"}><time>{event.getShortTime()}</time></p>
                    </div>
                </div>
                <style jsx>{`
                .event-list-item {
                    padding: 0.35rem 0.7rem;
                    margin: 0.25rem;
                    background-color: white;
                    cursor: pointer;
                    transition: 0.32s ease-in-out box-shadow, 0.32s ease-in-out transform;
                }

                .event-list-item:hover, .event-list-item.selected {
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
                    background: ${Styles.eventColors[event.getTypeString()]};
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
}
