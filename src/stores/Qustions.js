/* eslint-disable */
import { observable,  makeAutoObservable } from 'mobx'
import Question, { Qustion } from './Qustion'
export class Qustions {
    constructor(  interviewId , interviewType, companyName  , jobTitle , firstName , lastName ,interviewDate) {
            this.interviewId = interviewId ,
            this.jobTitle = jobTitle ,
            this.companyName = companyName ,
            this.interviewType = interviewType ,
            this.interviewDate = interviewDate ,
            this.firstName = firstName ,
            this.lastName = lastName ,
            this.qustion = [] //.push( new Qustion(questionId , title , question , solution) )

            makeAutoObservable(this, {
            interviewId: observable,
            jobTitle: observable,
            companyName: observable,
            solution: observable,
            interviewType: observable,
            firstName : observable,
            lastName : observable,
            qustion : observable
        })
    }
  
}