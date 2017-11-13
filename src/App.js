import React, { Component } from 'react';
import Engine from './components/engine';
import Carriage from './components/carriage';
import Station from './components/station';
import './App.css';
import {Platform}from './components/calculate-platform';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
                train: [{
                    engine: false,
                    carriage: [],
                }],
                displayTimeTicker:false,
                validate:false,
                isPlatform:false,
                departureTime:[],
                arrivalTime:[]
            }
        this.addStation = this.addStation.bind(this);
        this.allowDrop = this.allowDrop.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.toggleDisplayTimeTicker = this.toggleDisplayTimeTicker.bind(this);
        this.addArrival = this.addArrival.bind(this);
        this.getPlatform = this.getPlatform.bind(this);

    }

    allowDrop = (ev) => {
        ev.preventDefault();
    }
    toggleDisplayTimeTicker = (val) =>{
      let displayTimeTicker = val;
        this.setState({ displayTimeTicker });
    }
    onDrop = (ev, index) => {
        let { train } = this.state;
        let type =ev.dataTransfer.getData("text/plain");
        (type==='engine' && train[index].engine) ? alert("Only one engine allowed.") :'';
        (type==='crg' && !train[index].engine) ? alert("Carriage not allowed without Engine.") :'';
        (type==='crg' && train[index].carriage.length===10) ? alert("Cannot add more Carriage to this Train.") :'';
        if(type==='engine'){
           train[index].engine = true;
        }else{
          (train[index].engine && train[index].carriage.length<10)  
          ? train[index].carriage.push({'coach':true}):'';
        } 
        
        this.setState({ train });
    }
    engineDragStart = (ev) => {
        ev.dataTransfer.dropEffect = "move";
        ev.dataTransfer.setData("text/plain", 'engine');
    }
    crgDragStart = (ev) => {
        ev.dataTransfer.dropEffect = "move";
        ev.dataTransfer.setData("text/plain", 'crg');
    }
    addStation = () => {
        let { train } = this.state;
        train.push({
            engine: false,
            carriage: []
        })
        this.setState({validate:false});
        this.setState({ train });
    }
    addArrival = (obj) =>{
        let { train } = this.state;
        train[obj.index].arrival =obj.arrival;
        this.setState({ train })
        this.timeCheck(obj.index);
    }
    getPlatform = () =>{
      let { train } = this.state;
      train.departureTime=[];
      train.arrivalTime=[];
        train.map((item)=>{
          train.arrivalTime.push(item.arrival)
          train.departureTime.push(item.departure);
      });
        this.setState({ train }) 
        this.setState({ isPlatform:true })      
    }
    addDeparture = (obj) =>{
        let { train } = this.state;
        train[obj.index].departure =obj.departure;
        this.setState({ train })
        this.timeCheck(obj.index);
    }
    timeCheck = (index)=>{
        let validate = true;
        let { train } = this.state;      
        train.map((item)=>{
          if(!item.departure||!item.arrival){
            validate = false;
          }
          if(item.arrival >= item.departure){
          validate = false;
        }
        })
        this.setState({ validate })
        }
    render() {
        const stations = this.state.train.map((item, index) => {
            return <Station
            key={index}
            data = { item }
            index = { index }
            filter = { this.state.displayTimeTicker }
            allowDrop={this.allowDrop}
            onDrop ={this.onDrop}
            addArrival ={this.addArrival}
            addDeparture={this.addDeparture}
            toggleDisplayTimeTicker ={this.toggleDisplayTimeTicker}
            />
        })
        return ( <
            div className = "App container" >
            <header className = "App-header" >
              <h1 className = "App-title" > Welcome to Trains Booking. < /h1> 
              {this.state.isPlatform && <Platform train ={this.state.train}/>}
            </header> 
                <div className = "addTrain row" > 
                <button onClick = { this.addStation } type="button" 
                className="btn btn-info">Add Station </button>
                <button onClick = { this.getPlatform } type="button"
                disabled={!this.state.validate} 
                className="btn btn-info">Get Platform </button>
                </div >
                <div className="row">
                <Engine engineDragStart = { this.engineDragStart } / >
                <div className = "stationContainer col-md-8" > { stations } <
                /div> 
                <Carriage crgDragStart = { this.crgDragStart } / >
                </div>
                <footer className = "App-footer" >
              <a className="github" href="https://github.com/vikashyap">Vikas Kashyap Github</a>
            </footer>
            </div>
        );
    }
}

export default App;