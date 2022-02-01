/* eslint-disable */
import axios from 'axios';
import { observable, action, makeAutoObservable } from 'mobx'

export class UserInterview {
    
  
    constructor( firstName ,lastName , email ,cohort , companyName , jobTitle , type , date , status ) {

        this.firstName = firstName ,
        this.lastName = lastName ,
        this.email = email
        this.cohort = cohort , 
        this.companyName = companyName, 
        this.jobTitle = jobTitle ,
        this.type = type, 
        this.date = date, 
        this.status = status
   
        makeAutoObservable(this, {
            firstName : observable ,
            lastName : observable ,
            email : observable ,
            cohort  : observable , 
            companyName : observable, 
            jobTitle : observable ,
            type : observable, 
            date : observable, 
            status : observable
        })
    }
    
  
}

