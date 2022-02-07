import PropTypes from 'prop-types';
import React, { Component } from 'react';
import NameField from './NameField';
import PasswordField from './PasswordField';
import EmailField from './EmailField';
import AdminType from './AdminType';
import { inject } from 'mobx-react';



// import ChooseNotifications from '../ChooseNotifications'


export class Profile extends Component {
    constructor() {
        super()
        this.state = {
            adminData: {}
        }
    }

    async componentDidMount() {
        let adminDate = await this.props.adminStore.getAdminData()
        console.log(adminDate);
        this.setState({
            adminData: adminDate
        })
    }

    render() {
        return (
            <div className='profile'>
                {/* <ChooseNotifications /> */}
                <NameField firstName={this.state.adminData.firstName} lastName={this.state.adminData.lastName} />
                <PasswordField Password={this.state.adminData.Password} />
                <EmailField email={this.state.adminData.email} />
                <AdminType type={this.state.adminData.type} />
            </div>
        );
    }
}

export default inject("adminStore")(Profile)