import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MemoryRouter, Link } from 'react-router-dom';
import App from '../src/conteiners/App'
import { itemsPerPage } from '../src/components/AllDogs';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import NavBar from '../src/components/NavBar';

describe('ItemsPerPage', () => {
    test('itemsPerPage debe tener un valor de 8', () => {
        expect(itemsPerPage).toEqual(8);
    });
});

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};

let store = mockStore(initialState);

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  </Provider>
)

beforeEach(() => {
  store = mockStore(initialState);
});

describe('<NavBar />', () => {
  it('Debería ser renderizado en la ruta "/"', () => {
    expect(wrapper.find(NavBar)).toHaveLength(1);
  });

  it('Debería renderizar cuatro <Link to="" />', () => {
    expect(wrapper.find(Link).length).toBeGreaterThanOrEqual(4);
    expect(wrapper.find(Link).at(0).prop('to')).toEqual('/');
    expect(wrapper.find(Link).at(1).prop('to')).toEqual('/home');
    expect(wrapper.find(Link).at(2).prop('to')).toEqual('/create/breed');
    expect(wrapper.find(Link).at(3).prop('to')).toEqual('/dogs');
  });

  it('Debería tener un Link con el texto "Home" que cambie la ruta hacia "/home"', () => {
    expect(wrapper.find(Link).at(1).prop("to")).toEqual("/home");
    expect(wrapper.find(Link).at(1).text()).toEqual("Home");
  });
});
