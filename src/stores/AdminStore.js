/* eslint-disable */
import { observable, action, makeAutoObservable } from 'mobx'
const axios = require('axios')

export class AdminStore {
    constructor() {
        this.usersInterViews = [];
        this.x = ' ';
        makeAutoObservable(this, {
            usersInterViews: observable,
            x: observable,
            getUsersInterviews: action
        })
    }

    async getUsersInterviews() {
        let p = await axios.get("http://localhost:8888/loginPage")
        this.x = p.data
    }
}