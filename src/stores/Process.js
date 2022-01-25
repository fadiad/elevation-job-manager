/* eslint-disable */
import axios from 'axios';
import { observable, action, makeAutoObservable } from 'mobx'
import Interviews from './Interviews';

export class Process {
    constructor(companyName, foundBy, id, jobTitle, link, location, status,interviews) {

        this.id = id,
            this.companyName = companyName,
            this.jobTitle = jobTitle,
            this.location = location,
            this.foundBy = foundBy,
            this.link = link,
            this.status = status,
            this.interviews = interviews,


        makeAutoObservable(this, {
            id: observable,
            CompanyName: observable,
            JobTitle: observable,
            Location: observable,
            foundBy: observable,
            link: observable,
            status: observable,
            interviews: observable
        })
    }
}

