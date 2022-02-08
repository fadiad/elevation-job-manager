/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../../../styles/Admin.css'
import '../../theme';
import { ThemeProvider } from '@mui/material/styles';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { Button, TextField } from '@mui/material';
import theme from '../../theme';
import DateMomentUtils from '@date-io/moment'
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    Checkbox
} from '@material-ui/core';

class CreateJobAndSendToUser extends Component {
    constructor() {
        super()
        this.state = {
            company: ' ',
            jobNumber: '',
            jobTitle: '',
            description: '',
            link: '',
            selectAllUser: false,
            users: [],
            cohort : 'all',
            status : 'all',
            usersSelected : []
        }
        let cohort = 'all'
        let status = 'all'
    }
    async componentDidMount() {
        const users = await this.props.adminStore.getUser()
        let tempArray = []
        users.map((row, index) => (
            tempArray.push({"id" : row.id , "cohort" : row.cohort , "status" : row.status})
        ))
        this.setState({
            users: tempArray ,
            usersSelected : tempArray
        })
        console.log(tempArray);
    }
    handleChangeCompany = (event) => {
        this.setState({
            company: event.target.value
        })
    };
    handleChangeJobNumber = (event) => {
        this.setState({
            jobNumber: event.target.value
        })
    };
    handleChangeJobTitle = (event) => {
        this.setState({
            jobTitle: event.target.value
        })
    };
    handleChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    };
    handleChangeLink = (event) => {
        this.setState({
            link: event.target.value
        })
    };
    CohortChange = (e) => {
        this.cohort = e.target.value
        let tempUserArray = this.state.users;
        let usersSelected = tempUserArray.filter(user =>
            user.status.includes(this.state.status === 'all'? '' : this.state.status) &&
            user.cohort.includes(this.cohort === 'all'? '' : this.cohort))
        console.log(usersSelected);
        this.setState({
            cohort: e.target.value,
            usersSelected : usersSelected
        })
    }
    StatusChange = (e) => {
        this.status = e.target.value
        let tempUserArray = this.state.users;
        let usersSelected =tempUserArray.filter(user =>
            user.status.includes(this.status === 'all'? '' : this.status) &&
            user.cohort.includes(this.state.cohort === 'all'? '' : this.state.cohort))
        console.log(usersSelected);
        this.setState({
            status: e.target.value,
            usersSelected : usersSelected
        })
    }
    send = () => {
        console.log(this.state.usersId);

        let date = new Date()
        this.props.adminStore.sendJobToUser(this.state.company, this.state.jobNumber, this.state.jobTitle, this.state.description, this.state.link, date , this.state.usersSelected)
    }
    render() {
        return (
            <div>
                <TextField id="outlined-basic" onChange={this.handleChangeCompany} label="Company" variant="outlined" />
                <TextField id="outlined-basic" onChange={this.handleChangeJobNumber} label="Job Number" variant="outlined" />
                <TextField id="outlined-basic" onChange={this.handleChangeJobTitle} label="Job Title" variant="outlined" />
                <TextField id="outlined-basic" onChange={this.handleChangeDescription} label="Description" variant="outlined" />
                <TextField id="outlined-basic" onChange={this.handleChangeLink} label="Link" variant="outlined" />
                <Button onClick={this.send}>send</Button>
                <FormControl className='FormControl' >
                    <InputLabel className='InputLabel'>Cohort</InputLabel>
                    <Select className='Select' onChange={this.CohortChange}>
                        <MenuItem value={'all'}>all</MenuItem>
                        <MenuItem value={'Atidna 1'}>Atidna 1</MenuItem>
                        <MenuItem value={'Atidna 2'}>Atidna 2</MenuItem>
                        <MenuItem value={'Atidna 3'}>Atidna 3</MenuItem>
                        <MenuItem value={'Atidna 4'}>Atidna 4</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className='FormControl' >
                    <InputLabel className='InputLabel'>Status</InputLabel>
                    <Select className='Select' onChange={this.StatusChange}>
                        <MenuItem value={'all'}>all</MenuItem>
                        <MenuItem value={'Student'}>Student</MenuItem>
                        <MenuItem value={'Graduate'}>Graduate</MenuItem>
                    </Select>
                </FormControl>
                <TableContainer component={Paper} className='TableContainer'>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className='tableHeaderCell' style={{ color: "white" }}>
                                    {/* <Checkbox
                                        // defaultChecked
                                        onClick={() => {
                                            if (!this.state.selectAllUser) {
                                                let tempArray = []
                                                let checkedArray = []
                                                this.props.adminStore.users.map((row, index) => (
                                                    tempArray.push(row.id)
                                                ))
                                                this.props.adminStore.users.map((row, index) => (
                                                    checkedArray.push(true)
                                                ))
                                                this.setState({
                                                    selectAllUser: this.state.selectAllUser ? false : true,
                                                    usersId: tempArray,
                                                })
                                                this.checked = checkedArray

                                            } else {
                                                this.setState({
                                                    selectAllUser: this.state.selectAllUser ? false : true
                                                })
                                            }
                                        }}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    /> */}
                                </TableCell>
                                <TableCell className='tableHeaderCell' style={{ color: "white" }}>NAME</TableCell>
                                <TableCell className='tableHeaderCell' style={{ color: "white" }}>COHORT</TableCell>
                                <TableCell className='tableHeaderCell' style={{ color: "white" }}>STATUS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.adminStore.users.filter(user =>
                                user.status.includes(this.state.status === 'all'? '' : this.state.status) &&
                                user.cohort.includes(this.state.cohort === 'all'? '' : this.state.cohort)).map((row, index) => (
                                    <TableRow key={row.firstName}>
                                        <TableCell>
                                            <Grid container>
                                                <Grid item lg={2}>
                                                    <Avatar alt={row.firstName} src='.' className='avatar' />
                                                </Grid>
                                                <Grid item lg={3}>
                                                    <Typography className='name'>{row.firstName + " " + row.lastName} </Typography>
                                                    <Typography color='textSecondary' variant='body2'>{row.email}</Typography>
                                                    <Typography color='textSecondary' variant='body2'>{row.phone}</Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell > {row.cohort} </TableCell>
                                        <TableCell >{row.status}</TableCell>
                                        <TableCell >
                                            <Typography
                                                className='status1'
                                                style={
                                                    {
                                                        backgroundColor:
                                                            (
                                                                (row.status === 'Pending' && 'gray') ||
                                                                (row.status === 'Scheduled' && 'gray') ||
                                                                (row.status === 'Passed' && 'green') ||
                                                                (row.status === 'Failed' && 'red') ||
                                                                (row.status === 'No Reply' && 'gray')
                                                            )
                                                    }
                                                }
                                            >{row.status}</Typography>
                                        </TableCell>
                                        <TableCell style={{ display: (row.status !== 'Scheduled' && 'none') }} >
                                            <ThemeProvider theme={theme}>
                                                <Button variant="contained" onClick={() => {
                                                    this.props.adminStore.interviewId = row.id
                                                    console.log(this.props.adminStore.interviewId);
                                                    this.setOpenDialog()
                                                }} startIcon={<InsertInvitationIcon />}>Schedule Simulation</Button>
                                            </ThemeProvider>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}
export default inject("adminStore")(observer(CreateJobAndSendToUser))