/* eslint-disable */
import axios from 'axios';
import { observable, action, makeAutoObservable } from 'mobx'
import { Process } from './Process';

export class UserStore {
    constructor() {
        this.userID = 1
        this.userData = {};
        this.processes = []

        makeAutoObservable(this, {
            user: observable,
            processes: observable,
            getUserData: action,
            getprocesses: action,
            addProcess: action
        })

    }

    // async getUserData(userID) {
    //     let userData = await axios.get(`http://localhost:8888/studentPage/userData/${userID}`)
    //     this.userData = userData.data
    // }

    async getProcesses(userID) {
        let temp = await axios.get(`http://localhost:8888/studentPage/processes/${userID}`)
        temp.data.forEach(async e => {
            let interviews = await axios.get(`http://localhost:8888/studentPage/interviews/${e.id}`)
            this.processes.push(new Process(e.companyName, e.foundBy, e.id, e.jobTitle, e.link, e.location, e.status, interviews.data))
        });
    }


    addProcess = async (companyName, jobTitle, location, foundBy, link) => {
        let processe = {
            companyName: companyName,
            jobTitle: jobTitle,
            location: location,
            foundBy: foundBy,
            link: link
        }

        fetch(`http://localhost:8888/studentPage/processes/${this.userID}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(processe)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }

}


