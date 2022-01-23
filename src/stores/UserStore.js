/* eslint-disable */
import { observable, action, makeAutoObservable } from 'mobx'

export class UserStore {
    constructor() {
        this.user = {};

        makeAutoObservable(this, {
            user: observable
        })
    }
    getUserData = () => {
        fetch('/user', function(res) {

        })
    }
}