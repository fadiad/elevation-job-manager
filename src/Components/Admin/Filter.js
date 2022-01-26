
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

class Filter extends Component {
    
    render() {

        return (
            <div>
                
            </div>
        );
    }
}
export default inject("adminStore")(observer(Filter))