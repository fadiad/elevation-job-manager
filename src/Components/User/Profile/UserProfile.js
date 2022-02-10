
import React, { Component } from 'react';
import NameField from './NameField';
import PasswordField from './PasswordField';
import EmailField from './EmailField';
import PhoneField from './PhoneField';
import StatusField from './StatusField';
import CohortField from './CohortField';
import EditProfile from './EditProfile';
import UserNavBar from '../UserNavBar'



import { observer, inject } from 'mobx-react';
import EditIcon from '@mui/icons-material/Edit';
import '../../../styles/User.css'
import '../../../styles/fileCard.css'


// let opj = {
//     "cohort": userData.cohort,
//     "email": userData.email,
//     "firstName": userData.firstName,
//     "lastName": userData.lastName,
//     "phone": userData.phone,
//     "status": userData.status,
//     "isEmployeed": userData.isEmployeed
// }


export class UserProfile extends Component {
    constructor() {
        super()
        this.state = {
            userData: {},
            openDialog: false
        }
    }

    setOpenDialog = () => { this.setState({ openDialog: true }) }
    setCloseDialog = () => { this.setState({ openDialog: false }) }


    componentDidMount = () => {
        let userData = this.props.userStore.userData
        this.setState({ userData: userData }, function () {
            console.log(this.state.userData);
        })
    }

    sendEdits = async (name, lastName, password, email, phone) => {
        let userData = await this.props.userStore.sendEdits(name, lastName, password, email, phone)

        this.setState({ userData: userData.userData }, function () {
            console.log(this.state.userData);
        })

        return userData.statusCode
    }

    render() {
        return (
            <div >
                <UserNavBar />
                <div className='page'>
                    <h1>Profile</h1>
                    <div className='Profile'>
                        <EditIcon onClick={this.setOpenDialog} className='EditIcon' />

                        <EditProfile
                            openDialog={this.state.openDialog}
                            setOpenDialog={this.setOpenDialog}
                            setCloseDialog={this.setCloseDialog}
                            Password={this.state.userData.password}
                            sendEdits={this.sendEdits}
                        />

                        <NameField firstName={this.state.userData.firstName} lastName={this.state.userData.lastName} />
                        <PasswordField />
                        <EmailField email={this.state.userData.email} />
                        <PhoneField phone={this.state.userData.phone} />
                        <StatusField status={this.state.userData.status} />
                        <CohortField cohort={this.state.userData.cohort} />
                    </div>
                </div>
            </div>
        );
    }
}

export default inject("userStore")(observer(UserProfile))






 // let opj = {
        //     "cohort": userData.cohort,
        //     "email": userData.email,
        //     "firstName": userData.firstName,
        //     "lastName": userData.lastName,
        //     "phone": userData.phone,
        //     "status": userData.status,
        //     "isEmployeed": userData.isEmployeed
        // }
        // console.log(opj);