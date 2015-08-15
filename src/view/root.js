import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import Container from './container';

const store = configureStore();

export default React.createClass({
  render() {
    return <Provider store={store}>
             {() => <Container/>}
           </Provider>;
  }
});
