/* eslint-disable */
import axios from 'axios';
import { observable, action, makeAutoObservable } from 'mobx'

export class UserInterview {


    constructor(interviewId, firstName, lastName, email, cohort, companyName, jobTitle, type, date, status, simulationDate) {
        this.id = interviewId,
            this.firstName = firstName,
            this.lastName = lastName,
            this.email = email
        this.cohort = cohort,
            this.companyName = companyName,
            this.jobTitle = jobTitle,
            this.type = type,
            this.date = date,
            this.status = status,
            this.simulationDate = simulationDate

        makeAutoObservable(this, {
            firstName: observable,
            lastName: observable,
            email: observable,
            cohort: observable,
            companyName: observable,
            jobTitle: observable,
            type: observable,
            date: observable,
            status: observable,
            simulationDate: observable
        })
    }


}