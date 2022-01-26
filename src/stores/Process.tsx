/* eslint-disable */
import axios from 'axios';
import { observable, action, makeAutoObservable } from 'mobx'
// import Interviews from '../Components/User/Interviews';

export class Process {
    id : Number ;
    CompanyName : String ; 
    JobTitle : String ;
    Location : String;
    foundBy : String;
    link: String;
    status : String
    // interviews : Array<Interviews>
    constructor(id : number , CompanyName : String , JobTitle : String , Location : String, foundBy : String, link : String, status: String) {
        this.id = id,
        this.CompanyName = CompanyName,
        this.JobTitle = JobTitle,
        this.Location = Location,
        this.foundBy = foundBy ,
        this.link = link,
        this.status = status,
        // this.interviews = [],
        // this.userId = ""  
        makeAutoObservable(this, {
            id  : observable,
            CompanyName : observable,
            JobTitle : observable,
            Location : observable,
            foundBy : observable,
            link  : observable,
            status : observable ,
            // userId : observable,
            // interviews : observable
        })
    }
    // async getInterviews(){
    //     let temp = await  axios.get("http://localhost:8888/Processes")
    //     this.processes = temp.data
    // }
  
}

