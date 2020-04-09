import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import Layout from './components/Layout';
import Grid from './components/Grid';
import Car from './components/Car';

configure({ adapter: new Adapter() });

describe('<Layout /> test', () => {
  it('should render a grid', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.find(Grid)).toHaveLength(1)
  });
  it('should not render a car', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.find(Car)).not.toHaveLength(1)
  });
  it('should render a car', () => {
    const wrapper = shallow(<Layout />);
    wrapper.setState({
      position: {
        x:0, y:0, direction: 'north'
      },
      transform: {
        rotate: 0,
        left: 0,
        bottom: 0,
      },
      isReady: true,
      log: [],
    });
    expect(wrapper.find(Car)).toHaveLength(1)
  });
});