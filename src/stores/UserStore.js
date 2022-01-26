/* eslint-disable */
import { isValidDateValue } from '@testing-library/user-event/dist/utils';
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

    isValid(companyName, jobTitle, location, foundBy, link) {
        if (companyName.trim().isEmpty() || jobTitle.trim().isEmpty() ||
            location.trim().isEmpty() || foundBy.trim().isEmpty() || link.trim().isEmpty()) {
            return false
        } else if (isString(companyName) || isString(jobTitle) ||
            isString(location) || isString(foundBy) || isString(link)) {
            return false
        }
        else
            return true
    }

    async getProcesses(userID) {
        this.processes = []
        let temp = await axios.get(`http://localhost:8888/studentPage/processes/${userID}`)
        temp.data.forEach(async e => {
            let interviews = await axios.get(`http://localhost:8888/studentPage/interviews/${e.id}`)
            this.processes.push(new Process(e.companyName, e.foundBy, e.id, e.jobTitle, e.link, e.location, e.status, interviews.data))
        });
    }


    addProcess = async (companyName, jobTitle, location, foundBy, link) => {
        this.processes = []
        let processe = {
            companyName: companyName,
            jobTitle: jobTitle,
            location: location,
            foundBy: foundBy,
            link: link
        }

        if (isValid(companyName, jobTitle, location, foundBy, link)) {

            fetch(`http://localhost:8888/studentPage/processes/${this.userID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(processe)
            })
                .then(res => res.json())
                .then(data => {
                    data.forEach(async e => {
                        let interviews = await axios.get(`http://localhost:8888/studentPage/interviews/${e.id}`)
                        this.processes.push(new Process(e.companyName, e.foundBy, e.id, e.jobTitle, e.link, e.location, e.status, interviews.data))
                    });
                })

        }


    }

}