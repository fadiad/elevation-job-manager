/* eslint-disable */
import { observable, action, makeAutoObservable } from 'mobx'
const axios = require('axios')

export class AdminStore {
    x: string;
    usersInterViews : Array<string>  ; 

    constructor() {
        this.usersInterViews = [];
        this.x = ' ';
        makeAutoObservable(this, {
            usersInterViews: observable,
            x: observable,
            getUsersInterviews: action
        })
    }

    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }

    async getUsersInterviews() {
        let p = await axios.get("http://localhost:8888/loginPage")
        console.log(p.data);
        
        this.x = p.data
    }
}