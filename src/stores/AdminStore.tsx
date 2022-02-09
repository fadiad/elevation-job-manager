/* eslint-disable */
import { observable, action, makeAutoObservable } from 'mobx'
const axios = require('axios')
import { UserInterview } from './UserInterview';
import { Qustions } from './Qustions';
import { Qustion } from './Qustion';
import { Cohort } from './Cohort';
import { Participant } from './Participant'

import { fillterWantedNotificationsWhenGetThem, fillterNotificatios, allNots } from './HelperFunctions'

import { User } from './User';
export class AdminStore {
    adminId: Number;
    adminData: Object;
    interviewId: Number;
    adminName: String;
    statusByFilter: String;
    CohortByFilter: String;
    usersInterViews: Array<UserInterview>;
    generalStatistics: Object;
    statisticsByFilter: Object;
    qustions: Array<Qustions>;
    qustion: Qustion;
    cohorts: Array<Cohort>;
    participant: Participant;
    users: Array<User>;
    constructor() {
        this.users = [];
        this.adminData = {};
        this.usersInterViews = [];
        this.adminName = ' ';
        this.adminId = 3;
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
            adminData: observable,
            generalStatistics: observable,
            qustions: observable,
            qustion: observable,
            cohorts: observable,
            participant: observable,
            getUsersInterviews: action,
            getAdminData: action,
            setCohort: action,
            setStatus: action,
            getStatisticsByFilter: action,
            getQustions: action,
            addSulotion: action,
            editQuestion: action,
            deleteQuestion: action,
            addSimulationDate: action,
            getStatistics: action,
            getCohorts: action,
            addCohort: action,
            addAdmin:action
        })
    }

    sendEdits = async (name, lastName, password, email, phone) => {
        let body = {
            "adminId": this.adminId, "name": name, "lastName": lastName,
            "password": password, "email": email, "phone": phone
        }

        let data = await fetch(`http://localhost:8888/adminPage/profileDetails`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        return data.status
    }

    async sendJobToUser(company: String, jobNumber: String, jobTitle: String, description: String, link: String, date: Date, usersSelected) {
        let body = {
            userId: 1,
            adminId: 3,
            company: company,
            jobNumber: jobNumber,
            jobTitle: jobTitle,
            description: description,
            link: link,
            date: date,
            usersSelected: usersSelected
        }

        let data = await fetch('http://localhost:8888/adminPage/job', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        console.log(data);
        // .then(data => {
        //     console.log(data);                
        //     // this.getUserData(this.userID)
        // }).catch(err => {
        //     console.log(err)
        // })
    }
    async getUser() {
        this.users = []
        let usersData = await axios.get("http://localhost:8888/adminPage/candidate")
        // console.log(users.data);
        usersData.data.forEach(e => {
            this.users.push(new User(e.id, e.firstName, e.lastName, e.cohort, e.status, e.email, e.phone))
        });
        return this.users;
    }

    resetNotifications = async () => {
        let body = { "adminId": this.adminId }
        let data = await fetch(`http://localhost:8888/adminPage/resetNotifications`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        return data.status
    }

    getnotificationsType = async () => {
        let temp = await axios.get(`http://localhost:8888/adminPage/notificationsType/${this.adminId}`)
        let WantedNotifications = fillterWantedNotificationsWhenGetThem(temp.data)
        return WantedNotifications
    }

    setNotifications = async (wantedNotifications) => {
        let body = { "adminId": this.adminId }
        let wanted = fillterNotificatios(wantedNotifications)
        let unWanted = this.findUnWanted(allNots, wantedNotifications)
        unWanted = fillterNotificatios(unWanted)

        body["wanted"] = wanted
        body["unWanted"] = unWanted

        let data = await fetch(`http://localhost:8888/adminPage/setNotificationsType`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

        return data.status
    }

    findUnWanted(all, wanted) {
        let unWanted = []
        for (let i in all) {
            if (!wanted.includes(all[i])) {
                unWanted.push(all[i])
            }
        }
        return unWanted
    }
    setStatus(status: String) {
        this.statusByFilter = status
    }
    setCohort(cohort: String) {
        this.CohortByFilter = cohort
    }

    async editQuestion(questionId: Number, title: String, question: String, sulotion: String) {
        let questionData = {
            questionId: questionId,
            title: title,
            question: question,
            sulotion: sulotion
        }
        await fetch('http://localhost:8888/adminPage/question', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(questionData),
        })
            .then(data => {
                this.getQustions()
                console.log(data);
            }).catch(err => {
                console.log(err)
            })
    }

    async deleteQuestion(questionId: Number) {
        let body = {
            questionId: questionId,
        }
        fetch('http://localhost:8888/adminPage/question',
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            .then(data => {
                this.getQustions()
                console.log("delete Question work");
            });
    }
    async addSulotion(questionId: Number, sulotion: String) {
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
            }).catch(err => {
                console.log(err)
            })
    }

    async getAdminData() {
        let user = await axios.get(`http://localhost:8888/adminPage/AdminAllData/${this.adminId}`)
        this.adminData = user.data[0]
        return this.adminData
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
                this.qustions[this.qustions.length - 1].qustion.push(this.qustion)
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
                this.qustions[this.qustions.length - 1].qustion.push(this.qustion)
                id = qustionsFromServer.data[i].InterviewId
            }
        }
    }
    async getCohorts() {
        let cohortsFromServer = await axios.get("http://localhost:8888/adminPage/cohort")
        let cohorts = cohortsFromServer
    }

    async addCohort(newCohort) {
        let data = await fetch(`http://localhost:8888/adminPage/cohort`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCohort)
        })
        this.getCohorts()
    }
    async addAdmin(newAdmin){
       let result = await  fetch(`http://localhost:8888/adminPage/admin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAdmin)
        })
        return result.status
    }
    addSimulationDate = async (primaryDate, secondaryDate1, secondaryDate2) => {
        let body = {
            interviewId: this.interviewId,
            adminId: this.adminId,
            primaryDate: primaryDate,
            secondaryDate1: secondaryDate1,
            secondaryDate2: secondaryDate2
        }

        let data = await fetch(`http://localhost:8888/adminPage/simulation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

        return data.status
    }

    async getStatistics() {
        let FilterBy = {
            status: 'all',
            filter: 'all'
        }
        let Statistics = await axios.get('http://localhost:8888/adminPage/Statistics', {
            params: { cohort: 'all', interViewStatus: 'all' }

        })
        // console.log(Statistics.data);

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

