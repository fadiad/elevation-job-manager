
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


class ShowSemoletionTable extends Component {
    componentDidMount() {
        this.props.userStore.getSemoletions()
    }


    render() {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell>TYPE </TableCell>
                            <TableCell align="right">COMBANY</TableCell>
                            <TableCell align="right">JOB TITLE</TableCell>
                            <TableCell align="right">INTERVIEW Date</TableCell>
                            <TableCell align="right">SIMOLATEION DATE</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.userStore.Semoletions.map((row) => (
                            <TableRow
                                key={row.type}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.type}
                                </TableCell>
                                <TableCell align="right">{row.companyName}</TableCell>
                                <TableCell align="right">{row.jobTitle}</TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                                <TableCell align="right">{row.simulationDate}</TableCell>
                            </TableRow>
                        ))} 
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default inject("userStore")(observer(ShowSemoletionTable));
