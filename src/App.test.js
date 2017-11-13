import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import App from './App';
import Engine from './components/engine';
import Carriage from './components/carriage';
import Station from './components/station';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const train=[{engine: false,carriage: []}]
const render = (props = {}) => {
	const newtrain = { ...train}
	const newstation = Station.DecoratedComponent;
	return mount(<newstation data={newtrain}/>);
}
describe('App Component', function() {
	it('Renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<App />, div);
	});
	it('Renders Heading in App Component', () => {
	  const wrapper = shallow(<App/>);
	  expect(wrapper.find('.App-title').length).toEqual(1);
	});
	it('Renders engine component', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<Engine />, div);
	});
	it('Renders Carriage component', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<Engine />, div);
	});
	it('Renders Station component', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<Station  data = { train[0] } />, div);
	});
	it('Renders Add Station & Get platform Button in App Component', () => {
	  const wrapper = shallow(<App/>);
	  const textHeader = "Welcome to Trains Booking.";
	  expect(wrapper.find('.btn-info').length).toEqual(2);
	});
});
describe('Engine Component', function() {
	it('Renders Engine Icon in Engine Component', () => {
	  const wrapper = shallow(<Engine/>);
	  expect(wrapper.find('.engine').length).toEqual(1);
	});
});
describe('Carriage Component', function() {
	it('Renders Carriage Icon in carriage Component', () => {
	  const wrapper = shallow(<Carriage/>);
	  expect(wrapper.find('.carriage').length).toEqual(1);
	});
});
describe('Station Component', function() {
	it('should not render engine', function() {
		const wrapper = render(train[0].engine = false);
		expect(wrapper.find('.dropItem').length).toEqual(0);
	});
	it('should not render Carriage', function() {
		const wrapper = render(train[0].carriage = []);
		expect(wrapper.find('.dropItem').length).toEqual(0);
	});
});


 

