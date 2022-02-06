/* eslint-disable */
import { observable, makeAutoObservable } from 'mobx'
export class Participant {
    constructor(id, firstName, lastName, email, phone) {

        this.id = id,
            this.firstName = firstName,
            this.lastName = lastName,
            this.phone = phone,
            this.email = email,

            makeAutoObservable(this, {
                id: observable,
                firstName: observable,
                lastName: observable,
                phone: observable,
                email: observable
            })
    }

}