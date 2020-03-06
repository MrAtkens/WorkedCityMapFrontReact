import React, {PropTypes, PureComponent } from 'react/addons';
import {defaultPin, hoverPin} from './style.js';

import RoomIcon from '@material-ui/icons/Room';

export default class MyGreatPlaceWithControllableHover extends PureComponent  {
    static propTypes = {
        // use hover from controllable
        hover: PropTypes.bool
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    render() {
        const style = this.props.hover ? greatPlaceStyleHover : greatPlaceStyle;
        return (
            <RoomIcon style={style}/>
        );
    }
}