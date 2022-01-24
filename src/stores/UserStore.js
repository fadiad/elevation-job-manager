/* eslint-disable */
import axios from 'axios';
import { observable, action, makeAutoObservable } from 'mobx'
import {Process} from './Process';
export class UserStore {
    constructor() {
        this.user = {};
        this.processes = []
        makeAutoObservable(this, {
            user: observable ,
            processes : observable ,
            getUserData : action ,
            getprocesses : action
        })
    }

    async getUserData ()  {
        let temp = await  axios.get("http://localhost:8888/user")
        this.user = temp.data
    }

    async getprocesses(){
        let temp = await  axios.get("http://localhost:8888/Processes")
        temp.data.forEach(e => {
            this.processes.push(new Process(e.id ,e.CompanyName ,e.JobTitle , e.Location , e.foundBy , e.link , e.status))
        });
    }  
}