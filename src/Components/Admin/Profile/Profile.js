import React, { Component } from 'react';
import NameField from './NameField';
import PasswordField from './PasswordField';
import EmailField from './EmailField';
import AdminType from './AdminType';
import PhoneField from './PhoneField';
import EditProfile from './EditProfile';
import { observer, inject } from 'mobx-react';
import EditIcon from '@mui/icons-material/Edit';
import NavBar from '../AdminNavBar';

import '../../../styles/fileCard.css'


export class Profile extends Component {
    constructor() {
        super()
        this.state = {
            adminData: {},
            openDialog: false
        }
    }

    setOpenDialog = () => { this.setState({ openDialog: true }) }
    setCloseDialog = () => { this.setState({ openDialog: false }) }


    async componentDidMount() {
        let adminDate = await this.props.adminStore.getAdminData()
        console.log(adminDate);
        this.setState({
            adminData: adminDate
        })
    }

    sendEdits = (name, lastName, password, email, phone) => {
        return this.props.adminStore.sendEdits(name, lastName, password, email, phone)
    }



    render() {

        return (
            <div >
                <NavBar />
                <div className='page'>
                    <h1>Profile</h1>
                <div className='Profile'>
                    
                    <EditIcon onClick={this.setOpenDialog} className='EditIcon' />

                    <EditProfile
                        openDialog={this.state.openDialog}
                        setOpenDialog={this.setOpenDialog}
                        setCloseDialog={this.setCloseDialog}
                        Password={this.state.adminData.password}
                        sendEdits={this.sendEdits}
                    />

                    <NameField firstName={this.state.adminData.firstName} lastName={this.state.adminData.lastName} />
                    <PasswordField Password={this.state.adminData.Password} />
                    <EmailField email={this.state.adminData.email} />
                    <AdminType type={this.state.adminData.type} />
                    <PhoneField phone={this.state.adminData.phone} />
                </div>
                </div>
            </div>
        );
    }
}

export default inject("adminStore")(observer(Profile))
