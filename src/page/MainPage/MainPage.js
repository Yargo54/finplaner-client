import React, { Component } from "react";

import "./MainPage.css"

export default class MainPage extends Component {

    clickRegister = () => {
        this.props.history.push("/register");
    }

    clickLogin = () => {
        this.props.history.push("/login");
    }

    render() {
        return (
        <div className="main-div">
            <header className="header">
                <button className="button-register" onClick={this.clickRegister}>Зарегистрироваться</button>
                <button className="button-login" onClick={this.clickLogin}>Войти</button>
            </header>
            <main className="main">
                <h1 className="h1-in-main-page">Привет, это ФинПланер!</h1>
                <p className="p-in-main-page">Мы позаботимся о вашем финансовом планировании, чтобы вы могли преумножить свой капитал.</p>
            </main>
            <div className="div-contacts">
                <p className="p-contacts">Наши контакты:</p>
                <div className="div-git">
                    <a href='https://github.com/AleksandrAVK' className="AleksandrAVK-link">AleksandrAVK</a>  
                    <a href='https://github.com/Yargo54' className="Yargo54-link">Yargo54</a>
                </div>
            </div>
        </div>
        );
    }
}