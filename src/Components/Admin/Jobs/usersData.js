/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// import '../../../styles/Admin.css'
// import '../../theme';
class usersData extends Component {

    render() {
        return (
            <div className='a'>
                <h1>amir</h1>
                <h1>amir</h1>

            </div>
        );
    }
}
export default inject("adminStore")(observer(usersData))