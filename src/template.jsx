import React from 'react';
import { render } from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { withDatGui } from 'hoc-react-datgui';
import mapValues from 'lodash/mapValues';

import Component from '/* react-workbench-insert import */';

/// --- REDUX
const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'SET_STATE':
      return payload;
    case 'INIT_STATE':
      return {};
    default:
      return state;
  }
};
const store = createStore(
  reducer,
  compose(window.devToolsExtension ? window.devToolsExtension() : f => f)
);
/// --- !! REDUX

// Get component info and generate datgui
const model = mapValues(Component.__docgenInfo.props, (value, key) => ({
  type: value.type.name,
  defaultValue: value.defaultValue && value.defaultValue.value,
}));
const NewComponent = withDatGui(Component, model);

const App = () => (
  <Provider store={store}>
    <NewComponent />
  </Provider>
);

render(<App />, document.getElementById('app'));
