import {Component} from "react";
import LocationEvent from '../models/LocationEvent';
import EventsListItem from './EventsListItem';
import * as Styles from '../styles';
import * as React from "react";

interface EventsListState {}

interface EventsListProps {
    events: Array<LocationEvent>
    selected: LocationEvent;
    onEventSelected: any;
}

export default class EventsList extends Component<EventsListProps, EventsListState> {
    private scrollContainer: React.RefObject<any>;

    constructor(props: EventsListProps){
        super(props);
        this.scrollContainer = React.createRef();
        this.scrollToItem = this.scrollToItem.bind(this);
    }

    scrollToItem(destinationItem){
        // add some padding to the destination item
        let scrollDest = destinationItem.offsetTop - (60 + 60 + 24);
        let container = this.scrollContainer.current;

        if (scrollDest > container.scrollHeight - container.offsetHeight) {
            scrollDest = container.scrollHeight - container.offsetHeight;
        }
        this.scrollTo(scrollDest, container);
    }

    scrollTo(scrollDest : number, container : HTMLElement) {
        let scrollJump = 5;
        let maxScroll = 100;
        let currentScroll = container.scrollTop;
        let scrollDiff = Math.abs((scrollDest - currentScroll));
        let nextScroll = Math.max(Math.min(scrollDiff / scrollJump, maxScroll), 1);
        if (scrollDiff < nextScroll) {
            container.scrollTop = scrollDest;
        } else {
            if (container.scrollTop > scrollDest) {
                container.scrollTop -= nextScroll;
            } else {
                container.scrollTop += nextScroll;
            }

            setTimeout(() => {
                requestAnimationFrame(() => this.scrollTo(scrollDest, container));
            }, 1);
        }
    }

    render(){
        return (
            <div className={"events-list-container"}>
                <div className={"events-list-header"}>
                    <h3>Events List ({this.props.events.length})</h3>
                </div>
                <div className={"events-list-inner-wrapper"} ref={this.scrollContainer}>
                    <div className={"events-list-inner"}>
                        {this.props.events.map((event) =>
                            <EventsListItem
                                event={event}
                                selected={this.props.selected && this.props.selected._id === event._id}
                                onEventSelected={this.props.onEventSelected}
                                scrollToItem={this.scrollToItem}
                            />
                        )}
                    </div>
                </div>
                <style jsx>{`
                    div.events-list-container {
                        position: absolute;
                        top: 2rem;
                        left: 2rem;
                        max-height: calc(100% - 6rem);
                        background-color: ${Styles.lightGrey};
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
                        color: ${Styles.lightGrey};
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
