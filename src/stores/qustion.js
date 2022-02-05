/* eslint-disable */
import { observable, action, makeAutoObservable } from 'mobx'
export class Qustion {
    constructor(idQustion, title , qustion , solution  ) {

            this.idQustion = idQustion,
            this.title = title,
            this.qustion = qustion,
            this.solution = solution,
            

            makeAutoObservable(this, {
            idQustion: observable,
            title: observable,
            qustion: observable,
            solution: observable
        })
    }
  
}