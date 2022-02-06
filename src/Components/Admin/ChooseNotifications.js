// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
// import CommentIcon from "@mui/icons-material/Comment";



export class ChooseNotifications extends Component {

    constructor() {
        super()
        this.state = {
            expanded: false,
            notificationsTypeArr: [],
            constNotificationsTypeArr: ["Add new Phone Interview",
                "Add new Contract Interview",
                "Pass/Fail HR Interview",
                "Pass/Fail Technical Interview",
                "Add new HR Interview",
                "Add new Technical Interview",
                "Add new Process",
                "Add new Technical Question",
                "Add new HR Question",
                "User sign a contract and start work"]
        }
    }

    componentDidMount = async () => {
        let savedNotifications = await this.props.adminStore.getnotificationsType()
        this.setState({
            notificationsTypeArr: savedNotifications
        })
    }

    handleToggle = (value) => () => {

        const currentIndex = this.state.notificationsTypeArr.indexOf(value);
        const newChecked = [...this.state.notificationsTypeArr];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            notificationsTypeArr: newChecked
        })
    };

    handleChange = (panel) => (event, isExpanded) => {
        if (isExpanded) {
            this.setState({
                expanded: panel
            })
        } else {
            this.setState({
                expanded: false
            })
        }
    };

    setNotifications = async () => {
        let statusCode = await this.props.adminStore.setNotifications(this.state.notificationsTypeArr)
    }

    resetNotifications = async () => {
        let statusCode = await this.props.adminStore.resetNotifications(this.state.notificationsTypeArr)
        if (statusCode == 200) {
            this.setState({
                notificationsTypeArr: []
            })
        }
    }

    render() {
        return (
            <div>
                <Accordion expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')}>

                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <h3> Set notifications that you want to get</h3>
                    </AccordionSummary>

                    <AccordionDetails>
                        {/* <div className='Buttons'> */}
                        <Button style={{ margin: "10px" }} size="medium" variant="contained" onClick={this.setNotifications}>set</Button>
                        <Button size="medium" variant="contained" onClick={this.resetNotifications}>reset</Button>
                        {/* </div> */}
                        <div className='list'>
                            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                                {this.state.constNotificationsTypeArr.map((value) => {
                                    const labelId = `checkbox-list-label-${value}`;

                                    return (
                                        <ListItem
                                            key={value}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="comments">
                                                    {/* <CommentIcon /> */}
                                                </IconButton>
                                            }
                                            disablePadding
                                        >
                                            <ListItemButton
                                                role={undefined}
                                                onClick={this.handleToggle(value)}
                                                dense
                                            >
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={this.state.notificationsTypeArr.indexOf(value) !== -1}
                                                        // tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ "aria-labelledby": labelId }}
                                                    />

                                                </ListItemIcon>

                                                <ListItemText id={labelId} primary={`${value}`} />

                                            </ListItemButton>

                                        </ListItem>
                                    );
                                })}
                            </List>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }

}

export default inject("adminStore")(observer(ChooseNotifications))
