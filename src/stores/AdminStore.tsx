/* eslint-disable */
import { lastIndexOf } from 'core-js/core/array';
import { observable, action, makeAutoObservable } from 'mobx'
const axios = require('axios')
import { UserInterview } from './UserInterview';
// import {Qustion} from './Qustion';
import { Qustions } from './Qustions';
import { Qustion } from './Qustion';
export class AdminStore {
    adminId: Number;
    interviewId: Number;
    adminName: String;
    statusByFilter: String;
    CohortByFilter: String;
    usersInterViews: Array<UserInterview>;
    generalStatistics: Object;
    statisticsByFilter: Object;
    qustions: Array<Qustions>;
    qustion: Qustion
    constructor() {
        this.usersInterViews = [];
        this.adminName = ' ';
        this.adminId ;
        this.interviewId = 1;
        this.statusByFilter = 'Scheduled';
        this.CohortByFilter = 'all';
        this.qustions = [];
        this.qustion;
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
            qustions: observable,
            qustion: observable,
            getUsersInterviews: action,
            getAdminData: action,
            setCohort: action,
            setStatus: action,
            getStatisticsByFilter: action,
            getQustions: action,
            addSulotion : action
        })
    }
    setStatus(status: String) {
        this.statusByFilter = status
    }
    setCohort(cohort: String) {
        this.CohortByFilter = cohort
    }
    async addSulotion(questionId : Number,  sulotion : String){
        let body = {
            questionId: questionId,
            sulotion: sulotion
        }
        fetch('http://localhost:8888/adminPage/Sulotion', {
            method: 'PUT',
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
    async getAdminData() {
        let user = await axios.get("http://localhost:8888/adminPage/AdminData")
        this.adminName = user.data
    }
    async getQustions() {
        let qustionsFromServer = await axios.get("http://localhost:8888/adminPage/qustions")
        let id = qustionsFromServer.data[0].InterviewId
        this.qustions = []
        if (qustionsFromServer !== undefined) {
            this.qustions.push(new Qustions(
                qustionsFromServer.data[0].InterviewId,
                qustionsFromServer.data[0].type,
                qustionsFromServer.data[0].companyName,
                qustionsFromServer.data[0].jobTitle,
                qustionsFromServer.data[0].firstName,
                qustionsFromServer.data[0].lastName,
                qustionsFromServer.data[0].date

            ))
            this.qustion = new Qustion(
                qustionsFromServer.data[0].questionId,
                qustionsFromServer.data[0].title,
                qustionsFromServer.data[0].question,
                qustionsFromServer.data[0].solution
            )
            this.qustions[0].qustion.push(this.qustion)
        }
        for (let i = 1; i < qustionsFromServer.data.length; i++) {
            if (qustionsFromServer.data[i].InterviewId == id) {
                this.qustion = new Qustion(
                    qustionsFromServer.data[i].questionId,
                    qustionsFromServer.data[i].title,
                    qustionsFromServer.data[i].question,
                    qustionsFromServer.data[i].solution
                )
                this.qustions[this.qustions.length-1].qustion.push(this.qustion)
            } else {
                this.qustions.push(new Qustions(
                    qustionsFromServer.data[i].InterviewId,
                    qustionsFromServer.data[i].type,
                    qustionsFromServer.data[i].companyName,
                    qustionsFromServer.data[i].jobTitle,
                    qustionsFromServer.data[i].firstName,
                    qustionsFromServer.data[i].lastName,
                    qustionsFromServer.data[i].date,
                ))
                this.qustion = new Qustion(
                    qustionsFromServer.data[i].questionId,
                    qustionsFromServer.data[i].title,
                    qustionsFromServer.data[i].question,
                    qustionsFromServer.data[i].solution
                )
                this.qustions[this.qustions.length-1].qustion.push(this.qustion)
                id = qustionsFromServer.data[i].InterviewId  
            }
        }
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

