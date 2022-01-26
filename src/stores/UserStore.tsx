/* eslint-disable */
import axios from 'axios';
import { observable, action, makeAutoObservable } from 'mobx';
import {Process} from './process';


export class UserStore {
    user : {
        id:Number,
        firstName:String,
        lastName:String,
        email:String,
        phone:String,
        password:String,
        status: String,
        isEmployeed:Number,
        cohort:Number,
    };
    processes : Array<Process>
    // processes : Array<String>
    constructor() {
        this.user = {
            id         : 1,
            firstName  : "",
            lastName   : "",
            email      : "",
            phone      : "",
            password   : "",
            status     : "",
            isEmployeed: 1,
            cohort     : 1,
        };
        this.processes = []
        makeAutoObservable(this, {
            user: observable ,
            processes : observable ,
            getUserData : action ,
            getprocesses : action
        })
    }

    async getUserData ()  {        

        let temp = await  axios.get("http://localhost:8888/studentPage/user"
        , { params: { email: 'amir@gmail.com' } });
        this.user = temp.data
    }

    async getprocesses(){
        let temp = await  axios.get("http://localhost:8888/studentPage/Processes"
        , { params : { userId : this.user.id}})
        temp.data.forEach(e => {
            // this.processes.push( "Process(e.id ,e.CompanyName ,e.JobTitle , e.Location , e.foundBy , e.link , e.status)")
            
            this.processes.push(new Process(e.id ,e.CompanyName ,e.JobTitle , e.Location , e.foundBy , e.link , e.status))
        });
    }  
}