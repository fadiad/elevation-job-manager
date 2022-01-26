import React, { Component } from 'react';
class Interview extends Component {
    render() {
        return (
            <div>

                <span>
                    {
                        this.props.interview.interviewerName
                    }
                </span>

                <span>
                    {
                        this.props.interview.date
                    }
                </span>
                <span>
                    {
                        this.props.interview.processId
                    }
                </span>

                <span>
                    {
                        this.props.interview.simulationDate
                    }
                </span>
                <span>
                    {
                        this.props.interview.status
                    }
                </span>
                <span>
                    {
                        this.props.interview.type
                    }
                </span>
            </div>
        );
    }
}
export default Interview;