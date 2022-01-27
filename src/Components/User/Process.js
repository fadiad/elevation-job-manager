import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Interviews from './Interviews';
import '../../styles/process.css'

class Process extends Component {
    constructor(){
        super();
        this.state={
            icon: "-",
            showInterViews:true
        }
    }
    toggleInterViews = () => {
        if(this.state.showInterViews){
            this.setState({icon:"+",showInterViews:false})
        }else{
            this.setState({icon:"-",showInterViews:true})
        }
    }
    render() {
        return (
            <div className='Process'>
                
                <div class="mdc-card">
                <h3 className='icon' onClick={this.toggleInterViews}>{this.state.icon}</h3>
                    <h3>
                        {this.props.process.companyName}
                    </h3>
                    <h3>
                        {this.props.process.jobTitle}
                    </h3>
                    <h3>
                        {this.props.process.location}
                    </h3>
                    <h3>
                        {this.props.process.foundBy}
                    </h3>
                </div>
                {this.state.showInterViews ?
                <div>
                <div className='interviews'>
                    <div><h4>Interviews</h4></div>
                    <div><button>add interView</button></div>
                    <div><button>accepted</button></div>
                </div>

                <Interviews interviews={this.props.process.interviews} />
                </div>:
                null}
            </div>
        );
    }
}
// export default Process;
export default inject("userStore")(observer(Process))
