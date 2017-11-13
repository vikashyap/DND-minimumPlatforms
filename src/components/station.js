import React, { Component } from 'react';
import enginelogo from '../SteamTrain.svg';
import cariglogo from '../carriage.svg';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';

class Station extends Component {
	constructor(props) {
        super(props);
        this.state={
			dataIndex:this.props.index
		}
        this.allowDrop = this.props.allowDrop;
        this.onDrop = this.props.onDrop;
        this.toggleDisplayTimeTicker = this.props.toggleDisplayTimeTicker;

    }
    arrival =(value, index)=>{
    	if(value){
    	  this.props.addArrival({index:this.state.dataIndex,arrival:value.format('HH.mm')})
        }
    }
    departure =(value, index)=>{
    	if(value){
    	 this.props.addDeparture({index:this.state.dataIndex,departure:value.format('HH.mm')})	
    	}
    }
    render() {
    	const showSecond = false;
        const props = this.props || null;
        const carriage = props.data.carriage.map((item, index) => {
            return <div key = { index } className = "dropItem" > < img className = "droppedCrg"
            src = { cariglogo } alt = "logo" / > < /div>
        })

        const engine = props.data.engine ? < div className = "dropItem" > 
        < img className = "droppedEngine"
        src = { enginelogo } alt = "logo" / > < /div>:'';
        return <div className="station">
        <div className = "dropStation"
        onDragOver = {
            (e) => this.allowDrop(e) }
        onDrop = {
            (e) => this.onDrop(e, props.index) } > 
            {!props.data.engine && < div className = "dragText" >
            Please Drag Engine to make train. < /div>} { engine } { carriage } <
            /div>
            <div className="selectTimeContainer">
            {props.data.engine && <div className="form-group timeContainer">
			  <label >Arival Time:</label>
			  <TimePicker
			    style={{ width: 100 }}
			    showSecond={showSecond}
			    className="xxx"
			    onChange={this.arrival}
			   />
			</div>}
			{props.data.engine &&<div className="form-group timeContainer">
			  <label >Departure Time:</label>
			   <TimePicker 
			    style={{ width: 100 }}
			    showSecond={showSecond}
			    className="xxx"
			    onChange={this.departure}
			  />
			</div>}
            </div>
             
            </div>
        }
    }

    export default Station;