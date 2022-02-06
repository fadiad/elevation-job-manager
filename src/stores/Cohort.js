/* eslint-disable */
import { observable, makeAutoObservable } from 'mobx'
export class Cohort {
    constructor(name, startDate, endDate, deadline) {
        this.name = name,
            this.startDate = startDate,
            this.endDate = endDate,
            this.deadline = deadline,
            this.participants = []

        makeAutoObservable(this, {
            name: observable,
            startDate: observable,
            endDate: observable,
            deadline: observable
        })
    }

}