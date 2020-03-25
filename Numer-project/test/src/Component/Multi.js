import React, { Component } from 'react';

class Multi extends Component {
    render() {
        return (
            <div>
                this is multi {this.props.number*3}
            </div>
        );
    }
}

export default Multi;