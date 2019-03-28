
import 'jest-styled-components'
import toJson from 'enzyme-to-json'
import expect from 'expect'
import renderer from 'react-test-renderer';
import { shallow } from "enzyme"
import React from "react";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom'
import index from "./index"
import Header from './index';

configure({ adapter: new Adapter() });

describe('Header', () => {
    test('Rendering header', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper).toMatchSnapshot();
    });
    it('Rendering header when logged in', () => {
        const wrapper = shallow(<Header />);
        // sette state som autentisert, også 
    });
});

