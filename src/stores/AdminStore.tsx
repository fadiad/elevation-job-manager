/* eslint-disable */
import { lastIndexOf } from 'core-js/core/array';
import { observable, action, makeAutoObservable } from 'mobx'
const axios = require('axios')
import {UserInterview} from './UserInterview';

export class AdminStore {
    adminName: String;
    statusByFilter : String;
    CohortByFilter : String;
    usersInterViews : Array<UserInterview>  ; 
    generalStatistics : Object ;
    statisticsByFilter : Object ;
    constructor() {
        this.usersInterViews = [];
        this.adminName = ' ';
        this.statusByFilter = 'Scheduled';
        this.CohortByFilter = 'all';
        this.generalStatistics = {
            InProcess : '',
            employed : '',
            student : '',
            unEmployed : '',
            NotActive : ''
        }
        this.statisticsByFilter = {
            InProcess : '',
            employed : '',
            student : '',
            unEmployed : '',
            NotActive : ''
        }
        makeAutoObservable(this, {
            usersInterViews: observable,
            adminName: observable,
            generalStatistics : observable ,
            getUsersInterviews: action,
            getAdminData : action,
            setCohort : action , 
            setStatus : action, 
            getStatisticsByFilter : action
        })
    }
    setStatus(status :String ){
        this.statusByFilter = status
    }
    setCohort(cohort : String){
        this.CohortByFilter = cohort
    }
    async getAdminData(){
        let user = await axios.get("http://localhost:8888/adminPage/AdminData")
        this.adminName = user.data
    }

    async getStatistics(){
        let FilterBy = {
            status : 'all' ,
            filter : 'all'
        }
        let Statistics = await axios.get('http://localhost:8888/adminPage/Statistics', {
            params: { cohort:  'all' , interViewStatus :  'all'}

        })        
        this.generalStatistics = Statistics.data
    }

    async getStatisticsByFilter(){

        let FilterBy = {
            status : this.statusByFilter ,
            filter : this.CohortByFilter
        }
        let Statistics = await axios.get('http://localhost:8888/adminPage/Statistics', {
                params: { cohort: this.CohortByFilter , interViewStatus : this.statusByFilter}
        })

        this.statisticsByFilter = Statistics.data
    }

    async getUsersInterviews() {
        this.usersInterViews = [];
        let users = await axios.get("http://localhost:8888/adminPage/interviews"
        , { params: { cohort: this.CohortByFilter , interViewStatus : this.statusByFilter} });
        users.data.forEach(e  => {
            this.usersInterViews.push(new UserInterview(e.firstName ,e.lastName , e.email ,e.cohort , e.companyName  ,e.jobTitle , e.type , e.date , e.status))
        });
    }

}

