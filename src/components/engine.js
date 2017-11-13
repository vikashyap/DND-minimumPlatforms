import React, { Component } from 'react';
import enginelogo from '../SteamTrain.svg';

class Engine extends Component {
    constructor(props) {
        super(props);
        this.engineDragStart = this.props.engineDragStart;
    }
    render() {
        return <div className="engineContainer col-md-2"
        onDragStart={(e)=>this.engineDragStart(e)}
        draggable="true">
        <img src={enginelogo} className="engine"  alt="logo" />
        </div>;
    }
}

export default Engine;