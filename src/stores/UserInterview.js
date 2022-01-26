/* eslint-disable */
import axios from 'axios';
import { observable, action, makeAutoObservable } from 'mobx'

export class UserInterview {
    
  
    constructor( firstName ,lastName ,cohort , companyName , type , date , status ) {

        this.firstName = firstName ,
        this.lastName = lastName ,
        this.cohort = cohort , 
        this.companyName = companyName, 
        this.type = type, 
        this.date = date, 
        this.status = status
   
        makeAutoObservable(this, {
            firstName : observable ,
            lastName : observable ,
            cohort   : observable , 
            companyName: observable, 
            type : observable, 
            date : observable, 
            status : observable
        })
    }
    
  
}

