/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { ThemeProvider } from '@mui/material/styles';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { Link } from 'react-router-dom';
// import '../../theme';
import theme from '../theme';
// import '../theme';
import { Button, TextField } from '@mui/material';
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
class DisplayJobs extends Component {
    constructor() {
        super()
        this.state = {
            jobs: [],
        }
    }
    async componentDidMount() {
        const jobs = await this.props.userStore.getJobs()
        
        if (jobs !== undefined) {
            for (let i = 0; i < jobs.length; i++) {
                if (jobs[i].creatingJobDate !== null) {
                    jobs[i].creatingJobDate = jobs[i].creatingJobDate.toString().slice(0, 10)
                }
            }
        }
        this.setState({
            jobs: jobs === undefined ? [] : jobs
        })
        console.log(jobs);
    }
    render() {
        return (
            <div className='Filter'>
                <div>
                    <TableContainer component={Paper} className='TableContainer'>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className='tableHeaderCell' style={{ color: "white" }}>companyName</TableCell>
                                    <TableCell className='tableHeaderCell' style={{ color: "white" }}>Date</TableCell>
                                    <TableCell className='tableHeaderCell' style={{ color: "white" }}>creatingJobDate</TableCell>
                                    <TableCell className='tableHeaderCell' style={{ color: "white" }}>jobNumber</TableCell>
                                    <TableCell className='tableHeaderCell' style={{ color: "white" }}>jobTitle</TableCell>
                                    <TableCell className='tableHeaderCell' style={{ color: "white" }}>link</TableCell>
                                    <TableCell className='tableHeaderCell' style={{ color: "white" }}>description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.jobs.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Grid container>
                                                <Grid item lg={6}>
                                                    <Avatar alt={row.companyName} src='.' className='avatar' />
                                                </Grid>
                                                <Grid item lg={1}>
                                                    <Typography className='name'> </Typography>
                                                    <Typography className='name'> </Typography>
                                                    <Typography className='name'>{row.companyName} </Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell > {row.Date} </TableCell>
                                        <TableCell >{row.creatingJobDate}</TableCell>
                                        <TableCell > {row.jobNumber} </TableCell>
                                        <TableCell >{row.jobTitle}</TableCell>

                                        <TableCell >
                                            <a href={row.link} >
                                                <span > {row.link}</span>
                                            </a> </TableCell>
                                        <TableCell >{row.description}</TableCell>
                                        <TableCell >

                                        </TableCell>

                                    </TableRow>
                                ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        );
    }
}
export default inject("userStore")(observer(DisplayJobs))