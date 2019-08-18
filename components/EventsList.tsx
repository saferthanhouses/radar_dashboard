import {Component} from "react";
import LocationEvent from '../models/LocationEvent';
import EventsListItem from './EventsListItem';
import * as Styles from '../styles';

interface EventsListState {
}

interface EventsListProps {
    events: Array<LocationEvent>
}

export default class EventsList extends Component<EventsListProps, EventsListState> {
    constructor(props: EventsListProps){
        super(props);
    }

    render(){
        return (
            <div className={"events-list-container"}>
                <div className={"events-list-header"}>
                    <h3>Events List ({this.props.events.length})</h3>
                </div>
                <div className={"events-list-inner-wrapper"}>
                    <div className={"events-list-inner"}>
                        {this.props.events.map((event) => EventsListItem({event}))}
                    </div>
                </div>
                <style jsx>{`
                    div.events-list-container {
                        position: absolute;
                        top: 2rem;
                        left: 2rem;
                        max-height: calc(100% - 6rem);
                        background-color: ${Styles.whiteColor};
                        box-shadow: ${Styles.boxShadowRegular};
                        display: flex;
                        flex-direction: column;
                        min-width: 320px;
                    }

                    div.events-list-header {
                        background-color: ${Styles.primaryAccent};
                        display: flex;
                        padding: 0 1rem;
                    }

                    div.events-list-header h3 {
                        margin: 1rem 0.5rem;
                    }

                    div.events-list-header h3 {
                        color: ${Styles.whiteColor};
                    }

                    div.events-list-inner-wrapper {
                        height: 100%;
                        overflow: scroll;
                    }

                    div.events-list-inner {
                        display: flex;
                        flex-direction: column;
                        padding: 0.5rem;
                    }

                `}</style>
            </div>

        )
    }
}
