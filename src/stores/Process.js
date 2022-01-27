/* eslint-disable */
import axios from 'axios';
import { observable, action, makeAutoObservable } from 'mobx'
import {Interview} from './Interview';

export class Process {
    constructor(companyName, foundBy, id, jobTitle, link, location, status) {

            this.id = id,
            this.companyName = companyName,
            this.jobTitle = jobTitle,
            this.location = location,
            this.foundBy = foundBy,
            this.link = link,
            this.status = status,
            this.interviews = [],


        makeAutoObservable(this, {
            id: observable,
            CompanyName: observable,
            JobTitle: observable,
            Location: observable,
            foundBy: observable,
            link: observable,
            status: observable,
            interviews: observable ,
            addInterView : action
        })
    }


    addInterView(id , type , date , simulationDate , interviewerName , status , processId){
        let interview = new Interview(id , type , date , simulationDate , interviewerName , status , processId)
        this.interviews.push(interview)
    }
}

