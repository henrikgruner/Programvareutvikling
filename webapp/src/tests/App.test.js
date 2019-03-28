
import 'jest-styled-components'
import toJson from 'enzyme-to-json'
import expect from 'expect'

import renderer from 'react-test-renderer';
import { shallow } from "enzyme"
import React from "react";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom'
import index from "../index"
import ProfilePage from '../routes/ProfilePage';
import auth from "../store/reducers/auth"
import { userTypes, authTypes } from "../store/actions/actionTypes";
import LoginPage from "../routes/LoginPage";

configure({ adapter: new Adapter() });

it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<index />, div);
})

describe('Reducer', () => {
    it('Default state', () => {
        expect(auth(undefined, { type: 'unexpected' })).toEqual({ loading: false, authenticated: false, error: null, token: null });
    })
});

// describe what we are testing
describe('LoginPage', () => {
    // make our assertion and what we expect to happen 
    it('should render without throwing an error', () => {
        const wrapper = shallow(<LoginPage />);
        expect(wrapper).toMatchSnapshot();
    })
})

