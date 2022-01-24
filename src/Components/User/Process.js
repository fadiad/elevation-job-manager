import React, { Component } from 'react';
import Interviews  from './Interviews';
class Process extends Component {
  

    render(){
       
        return(
            <div className='Process'>
               CompanyName :  {this.props.process.CompanyName}
               JobTitle : {this.props.process.JobTitle}
               Location : {this.props.process.Location}
               foundBy : {this.props.process.foundBy}
                <br/>
                <br/>
                 <Interviews />
            </div>
        );
    }
}
export default Process;