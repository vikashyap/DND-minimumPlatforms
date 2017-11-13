import React, { Component } from 'react';
import cariglogo from '../carriage.svg';


class Carriage extends Component {
    constructor(props) {
        super(props);
        this.crgDragStart = this.props.crgDragStart;
    }
    render() {
        return <div className="crgContainer col-md-2" 
        onDragStart={(e)=>this.crgDragStart(e)}
        draggable="true">
        <img src={cariglogo} className="carriage"  alt="logo" />
        </div>;
    }
}

export default Carriage;