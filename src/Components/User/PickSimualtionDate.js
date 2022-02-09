import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

class PickSimulationDate extends Component {

    componentDidMount () {
        this.props.userStore.getSimulationsOfInterView()
        this.setState({ data: this.props.userStore.simulationsData })

    }

    constructor() {
        super()
        this.state = {
            open: false,
            values:[],
            data: [],
            radioGroupRef:React.createRef()
        }
    }

    handleChange = (event,i) => {
        let valuesCopy = [...this.state.values]
        valuesCopy[i]=event.target.value
        this.setState({ values: valuesCopy })
    }

    selectDate = (e,i) => {
        let simulationId = this.state.data[i].SimulationId
        let simulationDate = this.state.values[i]
        let interviewId = this.state.data[i].interviewId;
        this.props.userStore.SelectSimulationDate(simulationId,simulationDate,interviewId);
    }

    render() {
        return (
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {this.state.data.length > 0 ? <h4>You have Simualtion Dates to choose between</h4>:null }
                <List component="div" role="group">
                   
                    {this.state.data.map((d,i) => {
                        let title = d.companyName + " - " + d.jobTitle + " : " + d.type
                        let selectedValue = d.date1
                        let options = [d.date1]
                        if(d.date2 != null)  options.push(d.date2)
                        if(d.date3 != null) options.push(d.date3)
                        let radioGroup = <RadioGroup
                            ref={this.state.radioGroupRef}
                            aria-label="ringtone"
                            name="ringtone"
                            value={this.state.values[i]}
                            onChange={(e)=>this.handleChange(e,i)}
                        >
                            {options.map(option => (
                                <FormControlLabel
                                    value={option}
                                    key={option}
                                    control={<Radio />}
                                    label={option}
                                />
                            ))}
                        </RadioGroup>
                        return (
                            <ListItem button divider>
                                <ListItemText primary={title} secondary={radioGroup} />
                                <Button onClick={(e) => this.selectDate(e,i)}>Select</Button>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
        )
    }
}
export default inject("userStore")(observer(PickSimulationDate));

