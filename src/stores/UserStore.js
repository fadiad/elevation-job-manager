/* eslint-disable */
import axios from 'axios';
import { observable, action, makeAutoObservable, computed } from 'mobx'
import { Process } from './Process';

export class UserStore {
    constructor() {
        this.userID
        this.userData = {};
        this.processes = [];
        this.Simulations = [];
        this.simulationsData = [];

        makeAutoObservable(this, {
            userID: observable,
            processes: observable,
            userData: observable,
            setuserID: observable,
            Simulations: observable,
            simulationsData: observable,
            getUserData: action,
            getprocesses: action,
            addProcess: action,
            addInterView: action,
            changeStatus: action,
            getSimulationsOfInterView: action,
            SelectSimulationDate: action,
            getSimulations: action
        })
    }
    setuserID = (id) => {
        this.userID = id
    }

    async getSimulations() {
        let Simulations = await axios.get(`http://localhost:8888/studentPage/Simulations/${this.userID}`)
        this.Simulations = Simulations.data
    }

    async setNewQuestionFromInterview(id, question, title) {
        const obj = {
            interviewId: id,
            question: question,
            title: title
        }
        await fetch(`http://localhost:8888/studentPage/question`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
        this.getProcesses(this.userID)
    }
    async getUserData(id) {
        let userData = await axios.get(`http://localhost:8888/studentPage/userData/${id}`)
        this.userData = userData.data
    }

    assignAsAccepted(processId) {
        let body = {
            processId: processId,
            userID: this.userID,
        }

        fetch('http://localhost:8888/studentPage/processStatus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
            .then(data => {
                this.getUserData(this.userID)
            }).catch(err => {
                console.log(err)
            })
    }

    async getUserData(userID) {
        let userData = await axios.get(`http://localhost:8888/studentPage/userData/${userID}`)
        // console.log(userData.data[0]);
        this.userData = userData.data[0]
    }


    async addInterView(processId, type, date, interViewerName, status = 'Scheduled') {
        const interview = {
            processId: processId,
            type: type,
            date: date,
            interViewerName: interViewerName,
            status: status
        }
        await fetch(`http://localhost:8888/studentPage/interviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(interview)
        })

        this.getProcesses(this.userID)

        // let interviews = await axios.get(`http://localhost:8888/studentPage/interviews/${processId}`)
        // this.processes.find(p => p.id == processId).interviews = [];
        // interviews.data.forEach(i =>
        //     this.processes.find(p => p.id == processId).interviews
        //         .push(new Interview(i.id, i.type, i.date, i.simulationDate, i.interviewerName, i.status, i.processId))
        // )

    }
    isValid(companyName, jobTitle, location, foundBy, link) {

        if (companyName.trim().length === 0 || jobTitle.trim().length === 0 ||
            location.trim().length === 0 || foundBy.trim().length === 0) {
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
            interviews.data.forEach(i => process.addInterView(i.id, i.type, i.date, i.simulationDate, i.interviewerName, i.status, i.processId))
            this.processes.push(process)
        });
    }

    //async
    addProcess = async (companyName, jobTitle, location, foundBy, link) => {

        let processe = {
            companyName: companyName,
            jobTitle: jobTitle,
            location: location,
            foundBy: foundBy,
            link: link
        }

        if (this.isValid(companyName, jobTitle, location, foundBy, link)) {
            let data = await fetch(`http://localhost:8888/studentPage/processes/${this.userID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(processe)
            })
            this.getProcesses(this.userID)
            return data.status;
        }
    }

    changeStatus = (interviewId, processId, status, type) => {
        let bodyParams = {
            processId: processId,
            interViewId: interviewId,
            status: status,
            type: type
        }

        let self = this;
        fetch(`http://localhost:8888/studentPage/interViewStatus/${this.userID}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyParams),
        })
            .then(data => {
                if (bodyParams.type == 'Contract') {
                    this.assignAsAccepted(bodyParams.processId)
                }
                self.getInterViewById(interviewId, processId).status = status
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

    getSimulationsOfInterView = async () => {
        // this.simulationsData = []
        let result = await axios.get(`http://localhost:8888/studentPage/simulationDates/${this.userID}`);
        this.simulationsData = result.data;
    }
    SelectSimulationDate = async (simulationId, simulationDate, interviewId) => {
        let bodyParams = {
            date: simulationDate,
            interviewId: interviewId
        }
        let self = this;
        await fetch(`http://localhost:8888/studentPage/interviewSimlationDate/${this.userID}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyParams),
        })
        let body = {
            simulationId: simulationId,
        }
        // fetch('http://localhost:8888/adminPage/question', 
        // { 
        //     method: 'DELETE' ,
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(body),

        // })
        // .then(
        //     () =>{ console.log("delete Question work");
        // });
        await fetch(`http://localhost:8888/studentPage/Simulation/${this.userID}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then(data => {
            // console.log("delete success")
            this.getSimulationsOfInterView()
        }).catch(err => {

        })


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














// this.processes = []
// data.forEach(async e => {
//     let interviews = await axios.get(`http://localhost:8888/studentPage/interviews/${e.id}`)
//     this.processes.push(new Process(e.companyName, e.foundBy, e.id, e.jobTitle, e.link, e.location, e.status, interviews.data))
// });


 // fetch(`http://localhost:8888/studentPage/processes/${this.userID}`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(processe)
            // })
            //     .then(res => res.json())
            //     .then(data => {
            //         this.getProcesses(this.userID)
            //     })