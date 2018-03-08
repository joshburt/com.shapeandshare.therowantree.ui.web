import React from 'react';
import Secrets from './Secrets.js';

class Model extends React.Component {

    constructor(props) {
        super(props);
        this.userGUID = '870a7d28-1cef-11e8-b445-60f29d3d5700';
        this.playerActivityStatus = -1;

        let currentdate = new Date();
        this.birthday = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        // set the initial state
        this.updateModel();

    }

    updateModel() {
        // User activity status
        fetch(Secrets.SERVER_BASE + '/api/user/active/state', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'API-ACCESS-KEY': Secrets.API_ACCESS_KEY,
                'API-VERSION': Secrets.API_VERSION
            },
            body: JSON.stringify({
                guid: this.userGUID
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.playerActivityStatus = responseJson.active
            })
            .catch((error) =>{
                console.error(error);
            });
    }

}

export default Model;
