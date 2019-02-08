import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// Provider는 리액트 애플리케이션과 스토어를 연동할 때 도와주는 component이다.
import {Provider} from 'react-redux';
//import {createStore, applyMiddleware} from 'redux';

import Posts from './component/Posts';
import Postform from './component/Postform';

import store from './store';

class App extends Component {

  render() {
    return (
      // 연동할 프로젝트의 최상위 컴포넌트를 감싼다.
      // Provider 컴포넌트의 props로 store를 넣어준다.
      <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Postform/>
        <hr />
        <Posts />
      </div>
      </Provider>
    );
  }
}

export default App;
