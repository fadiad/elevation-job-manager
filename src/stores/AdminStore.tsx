/* eslint-disable */
import { lastIndexOf } from 'core-js/core/array';
import { observable, action, makeAutoObservable } from 'mobx'
const axios = require('axios')
import {UserInterview} from './UserInterview';

export class AdminStore {
    adminName: string;
    usersInterViews : Array<UserInterview>  ; 
    Statistics : Object
    constructor() {
        this.usersInterViews = [];
        this.adminName = ' ';
        this.Statistics = {
            InProcess : '',
            employed : '',
            student : '',
            unEmployed : '',
            NotActive : ''
        }
        makeAutoObservable(this, {
            usersInterViews: observable,
            adminName: observable,
            Statistics : observable ,
            getUsersInterviews: action,
            getAdminData : action
        })
    }

    async getAdminData(){
        let user = await axios.get("http://localhost:8888/adminPage/AdminData")
        this.adminName = user.data
    }

    async getStatistics(){
        let Statistics = await axios.get("http://localhost:8888/adminPage/Statistics")
        this.Statistics = Statistics.data
        
    }
    
    async getUsersInterviews() {
        let users = await axios.get("http://localhost:8888/adminPage/interviews"
        , { params: { cohort: 'all' , interViewStatus : 'all'} });
        users.data.forEach(e  => {
            this.usersInterViews.push(new UserInterview(e.firstName ,e.lastName ,e.cohort , e.companyName , e.type , e.date , e.status))
        });
    }
}

