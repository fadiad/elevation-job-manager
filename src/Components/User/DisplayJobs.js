/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import UserNavBar from './UserNavBar'
import '../../styles/jops.css'
import '../../styles/User.css'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography
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
            <div  >
                <UserNavBar />
                <div className='page'>
                    <h1>Job Offers</h1>
                    <TableContainer component={Paper} className='TableContainer'>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">

                            <TableHead>
                                <TableRow>
                                    <TableCell className='tableHeaderCell' style={{ color: "white" }}>company </TableCell>
                                    <TableCell className='tableHeaderCell' style={{ color: "white" }}>creating Job Date</TableCell>
                                    <TableCell className='tableHeaderCell' style={{ color: "white" }}>job Number</TableCell>
                                    <TableCell className='tableHeaderCell' style={{ color: "white" }}>job Title</TableCell>
                                    <TableCell className='tableHeaderCell' style={{ color: "white" }}>link</TableCell>
                                    <TableCell className='tableHeaderCell' style={{ color: "white" }}>description</TableCell>
                                    <TableCell className='tableHeaderCell' style={{ color: "white" }}></TableCell>
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
                                        <TableCell >{row.creatingJobDate}</TableCell>
                                        <TableCell > {row.jobNumber} </TableCell>
                                        <TableCell >{row.jobTitle}</TableCell>

                                        <TableCell >
                                            <a href={row.link} >
                                                <span > Link</span>
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