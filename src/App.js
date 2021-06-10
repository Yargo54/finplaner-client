import React, { Component } from 'react';
import {  Route  } from 'react-router-dom';

import MainPage from "./page/MainPage/MainPage";
import RegistrationPage from "./page/RegistrationPage/RegistrationPage";
import LoginPage from "./page/LoginPage/LoginPage";
import ChoisePage from "./page/ChoisePage/ChoisePage";
import ConvertPage from "./page/ConvertPage/ConvertPage";
import JugPage from "./page/JugPage/JugPage";
import SafePage from "./page/SafePage/SafePage";
import ZeroPage from "./page/ZeroPage/ZeroPage";
import LattePage from "./page/LattePage/LattePage";
import FiftyThirtyTwentyPage from "./page/FiftyThirtyTwentyPage/FiftyThirtyTwentyPage"

export default class App extends Component {
    render() {
        return (
        <div>
            <Route path="/" exact component={MainPage} />
            <Route path="/register" exact component={RegistrationPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/choise" exact component={ChoisePage} />
            <Route path="/convert" exact component={ConvertPage} />
            <Route path="/jug" exact component={JugPage} />
            <Route path="/safe" exact component={SafePage} />
            <Route path="/zero" exact component={ZeroPage} />
            <Route path="/latte" exact component={LattePage} />
            <Route path="/fifty-thirty-twenty" exact component={FiftyThirtyTwentyPage} />
        </div>
        );
    }
}
  
