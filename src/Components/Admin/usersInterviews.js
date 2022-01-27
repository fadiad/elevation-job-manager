    /* eslint-disable react-hooks/rules-of-hooks */

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../../styles/UsersInterview.css'
import {Table ,
    TableBody ,
    TableCell ,
    TableContainer ,
    TableHead ,
    TableRow , 
    Paper ,
    Avatar,
    Grid,
    Typography ,
    TablePagination,
    TableFooter
}from '@material-ui/core';

// eslint-disable-next-line no-undef
;




// const [page , setPage] = React.useState(0);
// const [rowsPerPage , setRowsPage] = React.useState(10);

// const handleChangePage = (event , newPage) => {
//     setRowsPage(+event.target.value);
//     setPage(newPage);
// }
// const handleChangeRowsPerPage = (event) => {
//     setRowsPage(+event.target.value);
//     setPage(0);
// }
// const dataTable = new MDCDataTable(document.querySelector('.mdc-data-table'));
class UsersInterviews extends Component {


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
           
            <TableCell className='tableHeaderCell'>NAME</TableCell>
            <TableCell className='tableHeaderCell'>COHORT</TableCell>
            <TableCell className='tableHeaderCell'>COMPANY</TableCell>
            <TableCell className='tableHeaderCell'>TYPE</TableCell>
            <TableCell className='tableHeaderCell'>DATE</TableCell>
            <TableCell className='tableHeaderCell'>STATUS</TableCell>
            <TableCell className='tableHeaderCell'></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {/* .slice(page* rowsPerPage , page * rowsPerPage + rowsPerPage) */}

          {this.props.adminStore.usersInterViews.map((row) => (
            <TableRow  key={row.firstName}>
                <TableCell>
                <Grid container>
                    <Grid item lg={2}>
                        <Avatar alt={row.firstName} src='.' className='avatar'/>
                    </Grid>
                    <Grid item lg={10}>
                       <Typography className='name'>{row.firstName + " " + row.lastName} </Typography>
                       <Typography color='textSecondary' variant='body2'>{row.firstName}</Typography>
                    </Grid>
                </Grid>
                </TableCell>
                <TableCell >
                  {row.cohort}
                </TableCell>
              <TableCell >{row.companyName}</TableCell>
              <TableCell >{row.type}</TableCell>
              <TableCell >{row.date}</TableCell>
                <TableCell >
                  <Typography 
                  className='status1'
                  style={
                    {

                        backgroundColor : 
                     (
                         (row.status === 'Pending' && 'gray') || 
                         (row.status === 'Scheduled' && 'gray')||
                         (row.status === 'Passed' && 'green')||
                         (row.status === 'Failed' && 'red')||
                         (row.status === 'No Reply' && 'gray')
                    )     
                    }
                }
                  >{row.status}</Typography>
                </TableCell>     
                <TableCell style={{display:(row.status !== 'Scheduled' && 'none')}} ><button>dummy interview</button></TableCell>
                

            </TableRow>
          ))}
        </TableBody>

        {/* <TableFooter>
                <TablePagination>
                    rowsPerPageOptions = {[10,25,100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage = {rowsPerPage}
                    page = {page}
                    onChangePage = {handleChangePage}
                    onChangeRowsPerPage = {handleChangeRowsPerPage}
                </TablePagination>
        </TableFooter> */}
      </Table>
    </TableContainer>
                
             </div> 
        );
    }
}
export default inject("adminStore")(observer(UsersInterviews))