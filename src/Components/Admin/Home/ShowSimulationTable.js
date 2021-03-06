
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../../../styles/Admin.css'

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
     paperStyle = { padding: 10, width: 450, margin: "10px auto"}
    render() {
        return (
            <TableContainer style={this.paperStyle} className='MuiDialog-paperFullWidth'>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Interviewed</TableCell>
                            <TableCell align='center'>Simulation Date </TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Company Name</TableCell>
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
