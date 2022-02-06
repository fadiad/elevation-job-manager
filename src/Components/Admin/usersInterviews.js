
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../../styles/UsersInterview.css'
import { Button } from '@mui/material';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { ThemeProvider } from '@material-ui/core';
import theme from '../theme';
import AddSimulationDate from './AddSimulationDate'

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
  Typography,
  TablePagination
} from '@material-ui/core';




class UsersInterviews extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      rowsPerPage: 5,
      order: '',
      orderBy: '',
      interviewId: 1,
      openDialog: false
    }
  }

  setOpenDialog = () => { this.setState({ openDialog: true }) }
  setCloseDialog = () => { this.setState({ openDialog: false }) }



  handleChangePage = (event, newPage) => {
    
    this.setState({
      page: newPage
    })
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0
    })
  
  }

  componentDidMount() {
    this.props.adminStore.getUsersInterviews()
  }

  render() {
    return (
      <div>

        <TableContainer component={Paper} className='TableContainer'>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>

                <TableCell className='tableHeaderCell' style={{ color: "white" }}>NAME</TableCell>
                <TableCell className='tableHeaderCell' style={{ color: "white" }}>COHORT</TableCell>
                <TableCell className='tableHeaderCell' style={{ color: "white" }}>JOB TITLE</TableCell>
                <TableCell className='tableHeaderCell' style={{ color: "white" }}>COMPANY</TableCell>
                <TableCell className='tableHeaderCell' style={{ color: "white" }}>TYPE</TableCell>
                <TableCell className='tableHeaderCell' style={{ color: "white" }}>DATE</TableCell>
                <TableCell className='tableHeaderCell' style={{ color: "white" }}>STATUS</TableCell>
                <TableCell className='tableHeaderCell' style={{ color: "white" }}>SIMULATION</TableCell>

              </TableRow>
            </TableHead>

            <TableBody>
              {this.props.adminStore.usersInterViews.slice(
                this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row, index) => (
                  <TableRow key={row.firstName}>

                    <TableCell>
                      <Grid container>
                        <Grid item lg={2}>
                          <Avatar alt={row.firstName} src='.' className='avatar' />
                        </Grid>
                        <Grid item lg={2}>
                          <Typography className='name'>{row.firstName + " " + row.lastName} </Typography>
                          <Typography color='textSecondary' variant='body2'>{row.email}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>

                    <TableCell > {row.cohort} </TableCell>

                    <TableCell >{row.jobTitle}</TableCell>
                    <TableCell >{row.companyName}</TableCell>
                    <TableCell >{row.type}</TableCell>
                    <TableCell >{row.date}</TableCell>
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

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={this.props.adminStore.usersInterViews.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
            />


          </Table>

        </TableContainer>

        <AddSimulationDate
          openDialog={this.state.openDialog}
          setOpenDialog={this.setOpenDialog}
          setCloseDialog={this.setCloseDialog}
          interviewId={this.state.interviewId}
        />

      </div>
    );
  }
}
export default inject("adminStore")(observer(UsersInterviews))