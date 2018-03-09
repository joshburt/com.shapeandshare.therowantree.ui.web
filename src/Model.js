import React from 'react';
import Secrets from './Secrets.js';

class Model extends React.Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem("therowantree_guid") == null){
            this.createUser();
        }
        else {
            this.guid = localStorage.getItem("therowantree_guid");
        }


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
    ///////////////////////////////////////////////////////////////////////////
    // CREATE
    ///////////////////////////////////////////////////////////////////////////
    createUser() {
        fetch(Secrets.SERVER_BASE + '/api/user/create', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'API-ACCESS-KEY': Secrets.API_ACCESS_KEY,
                'API-VERSION': Secrets.API_VERSION
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.guid = responseJson.guid;
                localStorage.setItem("therowantree_guid", responseJson.guid);
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    ///////////////////////////////////////////////////////////////////////////
    // READ
    ///////////////////////////////////////////////////////////////////////////
    updateUserStoresGameState() {
        fetch(Secrets.SERVER_BASE + '/api/user/stores', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'API-ACCESS-KEY': Secrets.API_ACCESS_KEY,
                'API-VERSION': Secrets.API_VERSION
            },
            body: JSON.stringify({
                guid: this.guid
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.stores = responseJson.stores;
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    updateUserIncomeGameState() {
        fetch(Secrets.SERVER_BASE + '/api/user/income', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'API-ACCESS-KEY': Secrets.API_ACCESS_KEY,
                'API-VERSION': Secrets.API_VERSION
            },
            body: JSON.stringify({
                guid: this.guid
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.income = responseJson.income;
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    updateUserStatusGameState() {
        fetch(Secrets.SERVER_BASE + '/api/user/active/state', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'API-ACCESS-KEY': Secrets.API_ACCESS_KEY,
                'API-VERSION': Secrets.API_VERSION
            },
            body: JSON.stringify({
                guid: this.guid
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.UserStatusGameState = responseJson.active;
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    updateUserActiveFeatureState() {
        fetch(Secrets.SERVER_BASE + '/api/user/active/feature', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'API-ACCESS-KEY': Secrets.API_ACCESS_KEY,
                'API-VERSION': Secrets.API_VERSION
            },
            body: JSON.stringify({
                guid: this.guid
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.activeFeature = responseJson.active_feature;
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    updateUserFeaturesState(){
        fetch(Secrets.SERVER_BASE + '/api/user/feature', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'API-ACCESS-KEY': Secrets.API_ACCESS_KEY,
                'API-VERSION': Secrets.API_VERSION
            },
            body: JSON.stringify({
                guid: this.guid
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.features = responseJson.features;
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    updateUserPopulationState() {
        fetch(Secrets.SERVER_BASE + '/api/user/population', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'API-ACCESS-KEY': Secrets.API_ACCESS_KEY,
                'API-VERSION': Secrets.API_VERSION
            },
            body: JSON.stringify({
                guid: this.guid
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.population = responseJson.population;
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    updateMerchantTransforms() {
        fetch(Secrets.SERVER_BASE + '/api/user/merchants', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'API-ACCESS-KEY': Secrets.API_ACCESS_KEY,
                'API-VERSION': Secrets.API_VERSION
            },
            body: JSON.stringify({
                guid: this.guid
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.merchants = responseJson.merchants;
            })
            .catch((error) =>{
                console.error(error);
            });
    }


    ///////////////////////////////////////////////////////////////////////////
    //  UPDATE
    ///////////////////////////////////////////////////////////////////////////
    setUserStatusActive() {
        // heartbeart.
        // He pounds his fists against the posts, and still insists he sees the ghost.
        fetch(Secrets.SERVER_BASE + '/api/user/active/set', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'API-ACCESS-KEY': Secrets.API_ACCESS_KEY,
                'API-VERSION': Secrets.API_VERSION
            },
            body: JSON.stringify({
                guid: this.guid,
                active: 1
            })
        })
            .catch((error) =>{
                console.error(error);
            });

    }

    transportUser(feature) {
        fetch(Secrets.SERVER_BASE + '/api/user/transport', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'API-ACCESS-KEY': Secrets.API_ACCESS_KEY,
                'API-VERSION': Secrets.API_VERSION
            },
            body: JSON.stringify({
                guid: this.guid,
                location: feature
            })
        })
            .catch((error) =>{
                console.error(error);
            });
    }

    updateUserIncomeSourceAllotment(textual_source_name, amount) {
        fetch(Secrets.SERVER_BASE + '/api/user/income/set', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'API-ACCESS-KEY': Secrets.API_ACCESS_KEY,
                'API-VERSION': Secrets.API_VERSION
            },
            body: JSON.stringify({
                guid: this.guid,
                income_source_name: textual_source_name,
                amount: amount
            })
        })
            .catch((error) =>{
                console.error(error);
            });
    }

    peformMerchantTransform(store_name) {
        fetch(Secrets.SERVER_BASE + '/api/merchant/transform', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'API-ACCESS-KEY': Secrets.API_ACCESS_KEY,
                'API-VERSION': Secrets.API_VERSION
            },
            body: JSON.stringify({
                guid: this.guid,
                store_name: store_name
            })
        })
            .catch((error) =>{
                console.error(error);
            });
    }


    updateModel() {
        this.updateUserStoresGameState();
        this.updateUserIncomeGameState();
        this.updateUserStatusGameState();
        this.updateUserActiveFeatureState();
        this.updateUserFeaturesState();
        this.updateUserPopulationState();
        this.updateMerchantTransforms();

        // not exactly state here, but we do maintain a heartbeat server side.
        this.setUserStatusActive()
    }

}

export default Model;
