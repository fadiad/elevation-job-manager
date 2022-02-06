/* eslint-disable */
import { observable, action, makeAutoObservable } from 'mobx'
export class qustion {
    constructor(id, interviewId, jobTitle, question, solution, interviewType, interviewDate) {

            this.id = id,
            this.interviewId = interviewId,
            this.jobTitle = jobTitle,
            this.question = question,
            this.solution = solution,
            this.interviewType = interviewType,
            this.interviewDate = interviewDate ,

            makeAutoObservable(this, {
            id: observable,
            interviewId: observable,
            jobTitle: observable,
            question: observable,
            solution: observable,
            interviewType: observable,
            interviewDate: observable
        })
    }
  
}