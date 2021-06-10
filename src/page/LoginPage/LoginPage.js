import React, { Component } from "react";

import "./LoginPage.css"

export default class LoginPage extends Component{

    clickSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        let loginAndPassword = {
            login: data.get('login'),
            password: data.get('password')
        }
        fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(loginAndPassword)
        })
        .then(res => res.json())
        .then((data) => {
            this.props.history.push(data.user.nameSchema);
        })
        .catch((error) => {
            alert("Неправильный логин или пароль!", error); //TODO: should refactor this 
        })
    }
    

    render() {
        return(
            <form className="transparent" onSubmit={(event) => { this.clickSubmit(event) }}>
                <div className="form-inner">
                    <h3>Вход</h3>
                    <label for="username">Ваш логин*</label>
                    <input type="text" id="username" name="login"/>
                    <label for="password">Ваш пароль*</label>
                    <input id="password" type="password" name="password"/>
                    <button type="submit">Войти</button>
                </div>
            </form>
        )
    }
}