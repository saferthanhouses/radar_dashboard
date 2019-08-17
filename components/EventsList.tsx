import {Component} from "react";
import Event from '../models/Event';
import EventsListItem from './EventsListItem';
import * as Styles from '../styles';

interface EventsListState {
}

interface EventsListProps {
    events: Array<Event>
}

export default class EventsList extends Component<EventsListProps, EventsListState> {
    constructor(props: EventsListProps){
        super(props);
    }

    render(){
        return (
            <div className={"events-list-container"}>
                <div className={"events-list-inner"}>
                    {this.props.events.map((event) => EventsListItem({event}))}
                </div>
                <style jsx>{`
                    div.events-list-container {
                        padding: ${Styles.defaultPadding};
                        position: absolute;
                        top: 2rem;
                        left: 2rem;
                        max-height: calc(100% - 6rem);
                        overflow-y: scroll;
                        background-color: ${Styles.whiteColor};
                        box-shadow: ${Styles.boxShadowLight};
                    }

                    div.events-list-inner {
                        padding: 0 1rem;
                    }
                `}</style>
            </div>

        )
    }
}
