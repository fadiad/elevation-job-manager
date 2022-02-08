
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

    constructor() {
        super()
        this.state = {
            simulations:[],

        }
    }
    async componentDidMount() {
        let simulationsData = await this.props.adminStore.getSimulations()
        this.setState({
            simulations: simulationsData === undefined ? [] : simulationsData
        })
    }

    render() {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">firstName</TableCell>
                            <TableCell align="center">lastName</TableCell>
                            <TableCell align='center'>simulationDate </TableCell>
                            <TableCell align="center">type</TableCell>
                            <TableCell align="center">companyName</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.simulations.map((row) => (
                            <TableRow
                                key={row.firstName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align='center'>{row.firstName}</TableCell>
                                <TableCell align="center">{row.lastName}</TableCell>
                                <TableCell align="center">{row.simulationDate}</TableCell>
                                <TableCell align="center">{row.type}</TableCell>
                                <TableCell align="center">{row.companyName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default inject("adminStore")(observer(ShowSimulationTable));
