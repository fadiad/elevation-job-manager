
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
    TablePagination
}from '@material-ui/core';




class UsersInterviews extends Component {
  constructor(){
    super();
    this.state ={
      page : 0 ,
      rowsPerPage : 5 , 
      order : '' ,
      orderBy : ''
    }
  }
 


   handleChangePage = (event , newPage) => {
    // let rows = this.props.adminStore.usersInterViews.length
    // let numOfPage
    // let rowInLastPage
    // if ((rows/this.state.rowsPerPage) === 0) {
    //   numOfPage =parseInt(rows/this.state.rowsPerPage) 
    //   rowInLastPage = rows%this.state.rowsPerPage      
    // }else{
    //   numOfPage =parseInt(rows/this.state.rowsPerPage) +1
    //   rowInLastPage = rows%(this.state.rowsPerPage)
    // }

    // if((numOfPage-1) === newPage )
    // {
    // this.setState({
    //   rowsPerPage : rowInLastPage ,
    //   page:newPage})
    // }
    // else {
    //     this.setState({
    //       rowsPerPage :this.state.rowsPerPage +0 ,
    //       page:newPage})      
    // }
        this.setState({
          page:newPage})      
  }
 handleChangeRowsPerPage = (event) => {
  this.setState({
    rowsPerPage:event.target.value,
    page:0})
    // setRowsPage(+event.target.value);
    // setPage(0);
}



//  dataTable = new MDCDataTable(document.querySelector('.mdc-data-table'));

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
          {this.props.adminStore.usersInterViews.slice(
            this.state.page* this.state.rowsPerPage , this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row , index)  => (
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
                
             </div> 
        );
    }
}
export default inject("adminStore")(observer(UsersInterviews))