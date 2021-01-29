import React, {Component} from 'react';
import axios from 'axios';
import SatSetting from './SatSettings';
import SatelliteList from './SatelliteList';
import {NEARBY_SATELLITE, SAT_API_KEY, STARLINK_CATEGORY} from "../constants";
class Main extends Component {
    render() {
        return (
            <div className='main'>
                <div className="left-side">
                    <SatSetting onShow={this.fetchSatellite}/>
                    <SatelliteList />
                </div>
                <div className="right-side">
                    right
                </div>

            </div>
        );
    }
    fetchSatellite= (setting) => {
        const {latitude, longitude, elevation, altitude} = setting;
        const url = `/api/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;

        this.setState({
            isLoadingList: true
        });

        axios.get(url)
            .then(response => {
                console.log(response.data)
                this.setState({
                    satInfo: response.data,
                    isLoadingList: false
                })
            })
            .catch(error => {
                console.log('err in fetch satellite -> ', error);
            })
    }

}

export default Main;