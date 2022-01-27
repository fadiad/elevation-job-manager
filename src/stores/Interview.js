/* eslint-disable */
import { observable, action, makeAutoObservable } from 'mobx'

export class Interview {
    constructor(id, type, date, simulationDate, interViewerName, status, processId) {

        this.id = id,
            this.type = type,
            this.date = date,
            this.simulationDate = simulationDate,
            this.interViewerName = interViewerName,
            this.status = status,
            this.processId = processId

        makeAutoObservable(this, {
            id: observable,
            type: observable,
            date: observable,
            simulationDate: observable,
            interViewerName: observable,
            status: observable,
            processId: observable,
            setStatus: action
        })
    }
    setStatus = (status) => {
        this.status = status;
    }

}