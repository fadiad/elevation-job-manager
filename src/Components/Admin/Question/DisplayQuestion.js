/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../../../styles/Admin.css';
import '../../theme';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import AddSulotion from './AddSulotion';
import  DeleteQuestion from './DeleteQuestion'
import  EditQuestion from './EditQuestion'
class DisplayQuestion extends Component {
    constructor() {
        super();
        this.state = {
            expanded: false,
            idQustion: 1,
            openSulotionDialog: false ,
            openEditDialog : false ,
            openDeleteDialog : false ,
            title : "",
            qustion : "" ,
            solution : ""
        }
    }
    setOpenSulotionDialog = () => {
        this.setState({
            openSulotionDialog: true,
        })
    }
    setCloseSulotionDialog = () => {
        this.setState({
            openSulotionDialog: false
        })
    }
    setOpenDeleteDialog = () => {
        this.setState({
            openDeleteDialog: true,
        })
    }
    setCloseDeleteDialog = () => {
        this.setState({
            openDeleteDialog: false
        })
    }
    setOpenEditDialog = () => {
        this.setState({
            openEditDialog: true,
        })
    }
    setCloseEditDialog = () => {
        this.setState({
            openEditDialog: false
        })
    }
    setQustionId = (id) => {
        this.setState({ idQustion: id })
    }
    handleChange = (panel) => (event, isExpanded) => {
        let isExp
        if (isExpanded) {
            isExp = panel
        } else {
            isExp = false
        }
        this.setState({ expanded: isExp })
    };

    render() {
        this.props.adminStore.qustions
        return (
            <div className='interview-question'>

                <br />
                <Accordion expanded={this.state.expanded === `panel1`} onChange={this.handleChange('panel1')}>

                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="sub-header"
                    >

                        <Typography sx={{ width: '20%', flexShrink: 0, color: '#426696' }}>{this.props.row.companyName}</Typography>
                        <Typography sx={{ width: '20%', flexShrink: 0, color: '#ff96aa' }}> {this.props.row.jobTitle}</Typography>
                        <Typography sx={{ width: '20%', flexShrink: 0, color: 'text.secondary' }}> {this.props.row.interviewType}</Typography>
                        <Typography sx={{ width: '20%', flexShrink: 0, color: 'text.secondary' }}>{this.props.row.interviewDate}</Typography>
                        <Typography sx={{ width: '20%', flexShrink: 0, color: 'text.secondary' }}> {this.props.row.firstName + " " + this.props.row.lastName}</Typography>

                    </AccordionSummary>
                    {this.props.row.qustion.map((q, index) => {
                        return (
                            <div className='question'>
                            <AccordionDetails >
                                <h2>{index + 1} :</h2>
                                <Typography >
                                    <span style={{ color: '#426696' }}>TITLE :</span>
                                    {q.title}
                                </Typography>
                                <br></br>
                                <Typography>
                                    <span style={{ color: '#426696' }}>QUESTION :</span>
                                    {q.qustion} 
                                </Typography>
                                <br></br>
                                <Typography>
                                    <span style={{ color: '#426696' }}>SOLUTION :</span>
                                    {q.solution}
                                </Typography>
                                <br></br>
                                <Button onClick={() => { this.setState({ idQustion: q.idQustion, openSulotionDialog: true }) }} >Add Sulotion</Button>
                                <Button
                                    onClick={
                                        () => {
                                            this.setState(
                                                {
                                                    idQustion: q.idQustion,
                                                    openEditDialog: true ,
                                                    title :   q.title ,
                                                    qustion : q.qustion ,
                                                    solution : q.solution 
                                                }
                                            )
                                        }
                                    }
                                >Edit Question</Button>
                                <Button
                                    onClick={
                                        () => {
                                            this.setState(
                                                {
                                                    idQustion: q.idQustion,
                                                    openDeleteDialog: true
                                                }
                                            )
                                        }
                                    }
                                >Delete Question</Button>


                            </AccordionDetails>
                                    </div>
                        )
                    })
                    }


                </Accordion>
                <DeleteQuestion
                    questionId={this.state.idQustion}

                    openDeleteDialog={this.state.openDeleteDialog}
                    setOpenDialog={this.setOpenDeleteDialog }
                    setCloseDialog={this.setCloseDeleteDialog}
                />
                <EditQuestion
                    questionId={this.state.idQustion}
                    title =   {this.state.title} 
                    question = {this.state.qustion} 
                    solution = {this.state.solution}
                    openEditDialog={this.state.openEditDialog}
                    setOpenDialog={this.setOpenEditDialog}
                    setCloseDialog={this.setCloseEditDialog}
                />

                <AddSulotion
                    solution = {this.state.solution}
                    questionId={this.state.idQustion}
                    openSulotionDialog={this.state.openSulotionDialog}
                    setOpenDialog={this.setOpenSulotionDialog}
                    setCloseDialog={this.setCloseSulotionDialog}
                />
            </div>
        );
    }
}
export default inject("adminStore")(observer(DisplayQuestion))