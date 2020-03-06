import React, {PropTypes, Component} from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';
import controllable from 'react-controllables';
import GoogleMapReact from 'google-map-react';

import { MapPin } from '../../components'

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
class SimpleMap extends Component {
    static propTypes = {
        center: PropTypes.array, // @controllable
        zoom: PropTypes.number, // @controllable
        hoverKey: PropTypes.string, // @controllable
        clickKey: PropTypes.string, // @controllable
        onHoverKeyChange: PropTypes.func, // @controllable generated fn

        greatPlaces: PropTypes.array
    };

    state = {
        center: {
            lat: 51.155025,
            lng: 71.443152
        },
        zoom: 11
    }


    onChildMouseEnter = (key /*, childProps */) => {
        this.props.onHoverKeyChange(key);
    }

    onChildMouseLeave = (/* key, childProps */) => {
        this.props.onHoverKeyChange(null);
    }

    render() {
        return (
            <div style={{height: '100vh', width: '100%'}}>
                <GoogleMapReact bootstrapURLKeys={{key: 'AIzaSyB_DtVvHSQ6eaQySVo1sOs4nWDQRAoTK2c'}}
                                onChildMouseEnter={this.onChildMouseEnter}
                                onChildMouseLeave={this.onChildMouseLeave}
                                defaultCenter={this.state.center} defaultZoom={this.state.zoom}>
                    <MapPin
                        key={1}
                        lat={51.155012}
                        lng={71.443123}
                        // use your hover state (from store, react-controllables etc...)
                        hover={this.props.hoverKey === id} />
                </GoogleMapReact>
            </div>
        )
    }
}

export default SimpleMap;