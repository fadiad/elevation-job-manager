import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Process from './Process'
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';

import '../../styles/processes.css'


class Processes extends Component {

    render() {
        return (
            <div className='processes' >

                <div className='header' >
                    <AccordionSummary
                        aria-controls="panel1bh-content"
                        id="main-header"
                    >
                        <Typography sx={{ width: '9%', flexShrink: 0, color: '#426696' }}> </Typography>
                        <Typography sx={{ width: '18%', flexShrink: 0, color: '#426696' }}>company </Typography>
                        <Typography sx={{ width: '18%', flexShrink: 0, color: '#426696' }}>Job Title</Typography>
                        <Typography sx={{ width: '18%', flexShrink: 0, color: '#426696' }}>City Name </Typography>
                        <Typography sx={{ width: '20%', flexShrink: 0, color: '#426696' }}>Link</Typography>
                        <Typography sx={{ width: '20%', flexShrink: 0, color: '#426696' }}>status </Typography>
                    </AccordionSummary>
                </div>
                {this.props.processes.map((p, index) => {
                    return (
                        <Process process={p} key={index} />
                    )
                })
                }
            </div>
        );
    }
}

export default inject("userStore")(observer(Processes))

