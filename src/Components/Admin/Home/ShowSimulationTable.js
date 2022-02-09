
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
            simulations: [],
        }
    }
    async componentDidMount() {
        let simulationsData = await this.props.adminStore.getSimulations()
        if (simulationsData !== undefined) {
            for (let i = 0; i < simulationsData.length; i++) {
                if (simulationsData[i].simulationDate !== null) {
                    simulationsData[i].simulationDate = simulationsData[i].simulationDate.toString().slice(0, 10) + ' ' + simulationsData[i].simulationDate.toString().slice(11, 19)
                }
            }
        }
        this.setState({
            simulations: simulationsData === undefined ? [] : simulationsData
        })
    }

    render() {
        console.log("amir");
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Interviewed</TableCell>
                            <TableCell align='center'>SimulationDate </TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">CompanyName</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.simulations.map((row) => (
                            <TableRow
                                key={row.firstName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align='center'>{row.firstName + " " + row.lastName} </TableCell>
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
