/* eslint-disable */
import axios from 'axios';
import { observable, action, makeAutoObservable, computed } from 'mobx'
import { Process } from './Process';
import { Interview } from './Interview'
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
            addProcess: action ,
            addInterView : action
        })
    }

    // async getUserData(userID) {
    //     let userData = await axios.get(`http://localhost:8888/studentPage/userData/${userID}`)
    //     this.userData = userData.data
    // }

    async addInterView(processId , type , date , interViewerName){
        const interview = { 
            processId : processId ,
            type : type ,
            date : date , 
            interViewerName : interViewerName ,
            status : 'Scheduled' 
        }
        await fetch(`http://localhost:8888/studentPage/interviews`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(interview)
                })

        let interviews = await axios.get(`http://localhost:8888/studentPage/interviews/${processId}`)
        this.processes.find(p => p.id == processId).interviews = [];
        interviews.data.forEach(i => 
            this.processes.find(p => p.id == processId).interviews
            .push( new Interview(i.id , i.type , i.date , i.simulationDate , i.interviewerName , i.status , i.processId))
            )
           
    }
    isValid(companyName, jobTitle, location, foundBy, link) {

        if (companyName.trim().length === 0 || jobTitle.trim().length === 0 ||
            location.trim().length === 0 || foundBy.trim().length === 0 || link.trim().length === 0) {
            return false
        }
        if (typeof companyName === 'string' || companyName instanceof String &
            typeof jobTitle === 'string' || jobTitle instanceof String &
            typeof location === 'string' || location instanceof String &
            typeof foundBy === 'string' || foundBy instanceof String &
            typeof link === 'string' || link instanceof String) {
            return true
        }

        return false
    }

    async getProcesses(userID) {
        this.processes = []
        let temp = await axios.get(`http://localhost:8888/studentPage/processes/${userID}`)
        temp.data.forEach(async e => {
            let interviews = await axios.get(`http://localhost:8888/studentPage/interviews/${e.id}`)
            let process = new Process(e.companyName, e.foundBy, e.id, e.jobTitle, e.link, e.location, e.status)
            interviews.data.forEach(i => process.addInterView(i.id , i.type , i.date , i.simulationDate , i.interviewerName , i.status , i.processId))
            this.processes.push(process) 
        });
    }

    //async
    addProcess = (companyName, jobTitle, location, foundBy, link) => {

        let processe = {
            companyName: companyName,
            jobTitle: jobTitle,
            location: location,
            foundBy: foundBy,
            link: link
        }

        if (this.isValid(companyName, jobTitle, location, foundBy, link)) {
            fetch(`http://localhost:8888/studentPage/processes/${this.userID}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(processe)
                })
                .then(res => res.json())
                .then(data => {
                    this.processes = []

                    data.forEach(async e => {
                        let interviews = await axios.get(`http://localhost:8888/studentPage/interviews/${e.id}`)
                        this.processes.push(new Process(e.companyName, e.foundBy, e.id, e.jobTitle, e.link, e.location, e.status, interviews.data))
                    });
                })
        }
    }

    changeStatus = (interviewId, processId, status) => {
        let bodyParams = {
            processId: processId,
            interViewId: interviewId,
            status: status
        }
        console.log("entered client change status")
        console.log(bodyParams)
        let self = this;
        //         console.log("Status Before:" + this.getInterViewById(interviewId, processId))
        fetch(`http://localhost:8888/studentPage/interViewStatus/${this.userID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyParams),
                // mode: 'no-cors'
            })
            .then(data => {
                //                 console.log("Status Before:" + self.getInterViewById(interviewId, processId))
                //                 self.getInterViewById(interviewId, processId).status = status
                //                 console.log("Status After:" + self.getInterViewById(interviewId, processId))
            }).catch(err => {
                console.log(err)
            })
    }

    getProcessById = (id) => {
        this.processes.forEach(process => {
            if (process.id === id)
                return process
        });
        return null;
    }

    getInterViewById = (interviewId, ProcessId) => {
        this.processes.forEach(process => {
            if (process.id === ProcessId) {
                process.interviews.forEach(interview => {
                    if (interview.id === interviewId)
                        return interview;
                });
            }
        });
        return null;
    }
    getInterViewStatus = (interviewId, processId) => {
        this.processes.forEach(p => {
            if (p.processId === processId) {
                p.interviews.forEach(i => {
                    if (i.id === interviewId)
                        return i.status;
                })
            }
        })
    }
}