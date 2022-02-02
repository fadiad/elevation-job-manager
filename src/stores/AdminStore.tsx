/* eslint-disable */
import { lastIndexOf } from 'core-js/core/array';
import { observable, action, makeAutoObservable } from 'mobx'
const axios = require('axios')
import { UserInterview } from './UserInterview';

export class AdminStore {
    adminId: Number;
    interviewId: Number;
    adminName: String;
    statusByFilter: String;
    CohortByFilter: String;
    usersInterViews: Array<UserInterview>;
    generalStatistics: Object;
    statisticsByFilter: Object;

    constructor() {
        this.usersInterViews = [];
        this.adminName = ' ';
        this.adminId ;
        this.interviewId = 1;
        this.statusByFilter = 'Scheduled';
        this.CohortByFilter = 'all';

        this.generalStatistics = {
            InProcess: '',
            employed: '',
            student: '',
            unEmployed: '',
            NotActive: ''
        }

        this.statisticsByFilter = {
            InProcess: '',
            employed: '',
            student: '',
            unEmployed: '',
            NotActive: ''
        }

        makeAutoObservable(this, {
            usersInterViews: observable,
            adminName: observable,
            generalStatistics: observable,
            getUsersInterviews: action,
            getAdminData: action,
            setCohort: action,
            setStatus: action,
            getStatisticsByFilter: action
        })
    }
    setStatus(status: String) {
        this.statusByFilter = status
    }
    setCohort(cohort: String) {
        this.CohortByFilter = cohort
    }
    async getAdminData() {
        let user = await axios.get("http://localhost:8888/adminPage/AdminData")
        this.adminName = user.data
    }

    addSimulationDate = (primaryDate, secondaryDate1, secondaryDate2) => {

        let body = {
            interviewId: this.interviewId,
            adminId: this.adminId,
            primaryDate: primaryDate,
            secondaryDate1: secondaryDate1,
            secondaryDate2: secondaryDate2
        }

        fetch('http://localhost:8888/adminPage/simulation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
            .then(data => {
                console.log(data);

                // this.getUserData(this.userID)
            }).catch(err => {
                console.log(err)
            })
    }

    async getStatistics() {
        let FilterBy = {
            status: 'all',
            filter: 'all'
        }
        let Statistics = await axios.get('http://localhost:8888/adminPage/Statistics', {
            params: { cohort: 'all', interViewStatus: 'all' }

        })
        this.generalStatistics = Statistics.data
    }

    async getStatisticsByFilter() {

        let FilterBy = {
            status: this.statusByFilter,
            filter: this.CohortByFilter
        }
        let Statistics = await axios.get('http://localhost:8888/adminPage/Statistics', {
            params: { cohort: this.CohortByFilter, interViewStatus: this.statusByFilter }
        })

        this.statisticsByFilter = Statistics.data
    }

    async getUsersInterviews() {
        this.usersInterViews = [];
        let users = await axios.get("http://localhost:8888/adminPage/interviews"
            , { params: { cohort: this.CohortByFilter, interViewStatus: this.statusByFilter } });
        users.data.forEach(e => {

            // console.log(e.id);
            this.usersInterViews.push(new UserInterview(e.id, e.firstName, e.lastName, e.email, e.cohort, e.companyName, e.jobTitle, e.type, e.date, e.status))
        });
    }

}

