/* eslint-disable */
import { observable, action, makeAutoObservable } from 'mobx'

export class AdminStore {
    constructor() {
        this.usersInterViews = [];
        this.x = '1';
        makeAutoObservable(this, {
            usersInterViews: observable,
            x: observable,
            getUsersInterviews: action
        })
    }


    async getUsersInterviews() {
        console.log("entered admin store")
        this.x = await fetch('http://localhost:4000/loginPage')
        console.log("entered admin store")
    }
}