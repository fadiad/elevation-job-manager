/* eslint-disable */
import { lastIndexOf } from 'core-js/core/array';
import { observable, action, makeAutoObservable } from 'mobx'
const axios = require('axios')
import { UserInterview } from './UserInterview';

export class AdminStore {
    adminId: 3;
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
        this.adminId = 3;
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

    getnotificationsType = async () => {
        // let temp = await axios.get(`http://localhost:8888/adminPage/notificationsType/${this.adminId}`)
        // console.log(temp.data);

        // let WantedNotifications = this.fillterWantedNotificationsWhenGetThem(temp.data)
        // return WantedNotifications
    }

    fillterWantedNotificationsWhenGetThem(arr) {
        let body = []

        for (let i of arr) {
            if (i.type1 == 'Phone') {
                body.push("Add new Phone Interview")
            } else if (i.type1 == 'Contract') {
                body.push("Add new Contract Interview")
            } else if (i.type1 == 'Pass/Fail' && i.type2 == 'HR') {
                body.push("Pass/Fail HR Interview")
            } else if (i.type1 == 'Pass/Fail' && i.type2 == 'Technical') {
                body.push("Pass/Fail Technical Interview")
            } else if (i.type1 == 'newInterview' && i.type2 == 'HR') {
                body.push("Add new HR Interview")
            }

            else if (i.type1 == 'newInterview' && i.type2 == 'HR') {
                body.push("Add new HR Interview")
            }
        }


        for (let i of arr) {
            if (i === "Add new Technical Interview") {
                body.push({ 'type1': 'newInterview', 'type2': 'Technical' })
            } else if (i === "Add new Process") {
                body.push({ 'type1': 'newProcess', 'type2': 'General' })
            } else if (i === "Add new Technical Question") {
                body.push({ 'type1': 'newQuestion', 'type2': 'Technical' })
            } else if (i === "Add new HR Question") {
                body.push({ 'type1': 'newQuestion', 'type2': 'HR' })
            } else if (i === "User sign a contract and start work") {
                body.push({ 'type1': 'contract', 'type2': 'General' })
            }
        }
        return body
    }



    setNotifications = async (wantedNotifications) => {

        let body = { "adminId": this.adminId }

        let all = this.fillterWantedNotifications(wantedNotifications)
        // console.log(all);


        // let data = await fetch(`http://localhost:8888/adminPage/setNotificationsType`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(body)
        // })
        // return data.status
    }

    fillterWantedNotifications(wantedNotes) {
        let allNots = ["Add new Phone Interview",
            "Add new Contract Interview",
            "Pass/Fail HR Interview",
            "Pass/Fail Technical Interview",
            "Add new HR Interview",
            "Add new Technical Interview",
            "Add new Process",
            "Add new Technical Question",
            "Add new HR Question",
            "User sign a contract and start work"]

        let wantedNotifications = []
        wantedNotifications = this.passOnTheArrAndGiveTheWanted(wantedNotes)
        // this.passOnTheArrAndGiveTheUnWanted(wantedNotes, allNots)
        console.log(wantedNotifications);

    }
    //                 unWantedNotifications.splice(index, 1);

    passOnTheArrAndGiveTheUnWanted(wantedNotes, allNotif) { // all notif..
        let unWantedNotifications = []

        // for (let i in wantedNotes) {
        //     let index = parseInt(i);
        //     if (arr[index] === "Add new Phone Interview") {
        //         unWantedNotifications.splice(index, 1);
        //     } else if (arr[index] === "Add new Contract Interview") {
        //         unWantedNotifications.splice(index, 1);
        //     } else if (arr[index] === "Pass/Fail HR Interview") {
        //         unWantedNotifications.splice(index, 1);
        //     } else if (arr[index] === "Pass/Fail Technical Interview") {
        //         unWantedNotifications.splice(index, 1);
        //     } else if (arr[index] === "Add new HR Interview") {
        //         unWantedNotifications.splice(index, 1);
        //     } else if (arr[index] === "Add new Technical Interview") {
        //         unWantedNotifications.splice(index, 1);
        //     } else if (arr[index] === "Add new Process") {
        //         unWantedNotifications.splice(index, 1);
        //     } else if (arr[index] === "Add new Technical Question") {
        //         unWantedNotifications.splice(index, 1);
        //     } else if (arr[index] === "Add new HR Question") {
        //         unWantedNotifications.splice(index, 1);
        //     } else if (arr[index] === "User sign a contract and start work") {
        //         unWantedNotifications.splice(index, 1);
        //     }
        // }

        // console.log(wantedNotifications);

        // all["unWantedNotifications"] = unWantedNotifications
        // all["wantedNotifications"] = wantedNotifications


        // return wantedNotifications
    }

    passOnTheArrAndGiveTheWanted(arr) {
        let wantedNotifications = []
        for (let i in arr) {
            let index = parseInt(i);
            if (arr[index] === "Add new Phone Interview") {
                wantedNotifications.push({ 'type1': 'Phone', 'type2': 'General' })
            } else if (arr[index] === "Add new Contract Interview") {
                wantedNotifications.push({ 'type1': 'Contract', 'type2': 'General' })
            } else if (arr[index] === "Pass/Fail HR Interview") {
                wantedNotifications.push({ 'type1': 'Pass/Fail', 'type2': 'HR' })
            } else if (arr[index] === "Pass/Fail Technical Interview") {
                wantedNotifications.push({ 'type1': 'Pass/Fail', 'type2': 'Technical' })
            } else if (arr[index] === "Add new HR Interview") {
                wantedNotifications.push({ 'type1': 'newInterview', 'type2': 'HR' })
            } else if (arr[index] === "Add new Technical Interview") {
                wantedNotifications.push({ 'type1': 'newInterview', 'type2': 'Technical' })
            } else if (arr[index] === "Add new Process") {
                wantedNotifications.push({ 'type1': 'newProcess', 'type2': 'General' })
            } else if (arr[index] === "Add new Technical Question") {
                wantedNotifications.push({ 'type1': 'newQuestion', 'type2': 'Technical' })
            } else if (arr[index] === "Add new HR Question") {
                wantedNotifications.push({ 'type1': 'newQuestion', 'type2': 'HR' })
            } else if (arr[index] === "User sign a contract and start work") {
                wantedNotifications.push({ 'type1': 'contract', 'type2': 'General' })
            }
        }
        return wantedNotifications
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

