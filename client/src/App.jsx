import React from 'react';
import { Route,withRouter } from 'react-router-dom';


import './css/App.css';
import ContentPage from './components/ContentPage';
import Header from './components/Header';
import Footer from './components/Footer';
import SideBarContainer from './components/ContainerComponents/SideBarContainer';


const App = (props) => {
  return (
    <div id="app">
        <Route path='/' render={Header} />
        <Route path='/' render={ContentPage} />
        <Route path='/' render={SideBarContainer} />
        <Route path='/' render={Footer} />
    </div>
  )
}


export default App;