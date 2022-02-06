
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


class ShowSimulationTable extends Component {
    componentDidMount() {
        this.props.userStore.getSimulations()
    }

    render() {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>TYPE </TableCell>
                            <TableCell align="center">COMPANY</TableCell>
                            <TableCell align="center">JOB TITLE</TableCell>
                            <TableCell align="center">INTERVIEW DATE</TableCell>
                            <TableCell align="center">SIMULATION DATE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.userStore.Simulations.map((row) => (
                            <TableRow
                                key={row.type}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align='center'>{row.type}</TableCell>
                                <TableCell align="center">{row.companyName}</TableCell>
                                <TableCell align="center">{row.jobTitle}</TableCell>
                                <TableCell align="center">{row.date}</TableCell>
                                <TableCell align="center">{row.simulationDate}</TableCell>
                            </TableRow>
                        ))} 
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default inject("userStore")(observer(ShowSimulationTable));
