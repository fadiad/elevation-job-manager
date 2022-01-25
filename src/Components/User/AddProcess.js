import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'


class AddProcess extends Component {

    constructor() {
        super()
        this.state = {
            companyName: ' ',
            jobTitle: ' ',
            location: ' ',
            link: ' ',
            foundBy: ' '
        }
    }

    setLink = (event) => {
        let link = event.target.value
        this.setState({
            link: link
        })
    }

    setCompanyName = (event) => {
        let companyName = event.target.value
        this.setState({
            companyName: companyName
        })
    }
    setJobTitle = (event) => {
        let jobTitle = event.target.value
        this.setState({
            jobTitle: jobTitle
        })
    }
    setLocation = (event) => {
        let location = event.target.value
        this.setState({
            location: location
        })
    }

    setFoundBy = (event) => {
        let foundBy = event.target.value
        this.setState({
            foundBy: foundBy
        })
    }


    addProcess = () => {
        this.props.userStore.addProcess(this.state.companyName, this.state.jobTitle, this.state.location, this.state.foundBy, this.state.link)
    }


    render() {
        return (
            <div>

                <input type="text" placeholder='CompanyName' onChange={this.setCompanyName} />
                <input type="text" placeholder='Job Title' onChange={this.setJobTitle} />
                <input type="text" placeholder='Location' onChange={this.setLocation} />
                <input type="text" placeholder='Link' onChange={this.setLink} />

                <select value={this.state.foundBy} onChange={this.setFoundBy}>
                    <option value="facebook">facebook</option>
                    <option value="linkedIn">linkedIn</option>
                    <option value="friend">friend</option>
                    <option value="other">other</option>
                </select>
                <button onClick={this.addProcess}>add process</button>

            </div>
        );
    }
}
export default inject("userStore")(observer(AddProcess));

