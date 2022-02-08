/* eslint-disable */
import { observable, action, makeAutoObservable } from 'mobx'
export class User {
    constructor(id , firstName, lastName , cohort , status , email , phone) {
            this.id = id
            this.firstName = firstName,
            this.lastName = lastName,
            this.cohort = cohort,
            this.status = status,
            this.email = email ,
            this.phone = phone ,

            makeAutoObservable(this, {
                id : observable ,
                firstName: observable,
                lastName: observable,
                cohort: observable,
                status: observable ,
                email : observable ,
                phone : observable ,

        })
    }
  
}