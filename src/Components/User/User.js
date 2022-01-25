import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Processes from './Processes';

class User extends Component {

    componentDidMount() {
        this.props.userStore.getUserData()

    }
    render() {
        return (
            <div>

                <button>add process</button>
                <Processes />
            </div>
        );
    }
}

export default inject("userStore")(observer(User))


