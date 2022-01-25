import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Processes from './Processes';

import AddProcess from './AddProcess';

class User extends Component {

    render() {
        return (
            <div>
                <AddProcess/>
                {/* <button>add process</button> */}
                <br />
                <br />
                <br />
                <br />
                <Processes />
            </div>
        );
    }
}

export default inject("userStore")(observer(User))


