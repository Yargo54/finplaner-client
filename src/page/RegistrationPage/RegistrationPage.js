import React, { Component } from "react";

import "./RegistrationPage.css"

export default class RegistrationPage extends Component{

    state = {
        isActive: false
    }

    handleCheckboxChange = () => {
        let { isActive } = this.state;
        this.setState( {isActive: !isActive} )
    }

    clickSubmit = (event) => {
        let { isActive } = this.state;
        event.preventDefault();
        const data = new FormData(event.target);
        if(data.get('name') === '' || data.get('login') === '' || data.get('password') === '' || isActive !== true){
            alert('Не все поля заполненны!');
        } else {

            let login = data.get('login');
            let password = data.get('password');
            localStorage.setItem('login', login);
            localStorage.setItem('password', password);
            alert('Регистрация прошла успешно!');
            this.props.history.push("/choise");
        }
    }

    render() {
        return(
            <form className="transparent" onSubmit={(event) => { this.clickSubmit(event) }}>
                <div className="form-inner">
                    <h3>Регистрация</h3>
                    <label for="username">Ваше имя*</label>
                    <input type="text" id="username" name="name" onChange={this.updateInputValueName}/>
                    <label for="username">Логин*</label>
                    <input type="text" id="username" name="login" onChange={this.updateInputValueLogin}/>
                    <label for="password">Пароль*</label>
                    <input id="password" type="password" name="password" onChange={this.updateInputValuePassword}/>
                    <input type="checkbox" id="custom-checkbox" onChange={this.handleCheckboxChange}/>
                    <label for="custom-checkbox">Я даю согласие на обработку персональных данных</label>
                    <button type="submit">Отправить</button>
                </div>
            </form>
        )
    }
}