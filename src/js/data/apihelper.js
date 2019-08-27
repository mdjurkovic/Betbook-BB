import data from './data';
import React from 'react'
import dataCompetitions from "./dataCompetitions";
import hsData from "./hsData";

const timeoutInterval = 0;

class APIHelper extends React.Component {
    constructor(props) {
        super(props);
    }

    login = (username, password, callBack) => {
        setTimeout(() => {
            callBack({success: true});
        }, timeoutInterval);
    }

    register = (username, password, email, callBack) => {
        setTimeout(() => {
            callBack({success: true});
        }, timeoutInterval);
    }

    settings = {
        getSettings: (callBack) => {
            setTimeout(() => {
                callBack({firstname: 'teeeeest'});
            }, timeoutInterval);
        },
        setSettings: (username, email, callBack) => {
            setTimeout(() => {
                callBack({success: true});
            }, timeoutInterval);
        }
    }

    competitions = {
        getAll: (callBack) => {
            setTimeout(() => {
                callBack(dataCompetitions);
            }, timeoutInterval);
        },
        getByID: (id, callBack) => {
            setTimeout(() => {
                callBack(dataCompetitions[0].competition[id]);
            }, timeoutInterval);
        }
    }

    match = {
        getByID: (id, callBack) => {
            setTimeout(() => {
                callBack(data[2]);
            }, timeoutInterval);
        },
        getAll: (callBack) => {
            setTimeout(() => {
                callBack(data[2]);
            }, timeoutInterval);
        }
    }

    home = (callBack) => {
        setTimeout(() => {
            callBack(hsData);
        }, timeoutInterval);
    }

    week = (callBack) => {
        setTimeout(() => {
            callBack(hsData);
        }, timeoutInterval);
    }
}

export default APIHelper