import React, { Component } from "react";

import "./ChoisePage.css"

export default class ChoisePage extends Component {

    state={
        shortConvert: '',
        shortJug: '',
        shortSafe: '',
        shortZero: '',
        shortLatte: '',
        short50_30_20: ''
    }

    clickConvert = () => {
        let programm = {
            login: localStorage.getItem('login'),
            password: localStorage.getItem('password'),
            nameSchema: "./convert",
            allMoney: 0
        }
        fetch('https://finplanner-api.herokuapp.com/reqister', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(programm)
        })
        .catch((err) => {
            alert(err)
        })
        this.props.history.push("./convert")
    }

    clickJug = () => {
        let programm = {
            login: localStorage.getItem('login'),
            password: localStorage.getItem('password'),
            nameSchema: "./jug",
            allMoney: 0
        }
        fetch('https://finplanner-api.herokuapp.com/reqister', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(programm)
        })
        .catch((err) => {
            alert(err)
        })
        this.props.history.push("./jug")
    }

    clickSafe = () => {
        let programm = {
            login: localStorage.getItem('login'),
            password: localStorage.getItem('password'),
            nameSchema: "./safe",
            allMoney: 0
        }
        fetch('https://finplanner-api.herokuapp.com/reqister', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(programm)
        })
        .catch((err) => {
            alert(err)
        })
        this.props.history.push("./safe")
    }

    clickZero = () => {
        let programm = {
            login: localStorage.getItem('login'),
            password: localStorage.getItem('password'),
            nameSchema: "./zero",
            allMoney: 0
        }
        fetch('https://finplanner-api.herokuapp.com/reqister', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(programm)
        })
        .catch((err) => {
            alert(err)
        })
        this.props.history.push("./zero")
    }

    clickLatte = () => {
        let programm = {
            login: localStorage.getItem('login'),
            password: localStorage.getItem('password'),
            nameSchema: "./latte",
            allMoney: 0
        }
        fetch('https://finplanner-api.herokuapp.com/reqister', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(programm)
        })
        .catch((err) => {
            alert(err)
        })
        this.props.history.push("./latte")
    }

    clickFiftyThirtyTwenty = () => {
        let programm = {
            login: localStorage.getItem('login'),
            password: localStorage.getItem('password'),
            nameSchema: "./fifty-thirty-twenty",
            allMoney: 0
        }
        fetch('https://finplanner-api.herokuapp.com/reqister', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(programm)
        })
        .catch((err) => {
            alert(err)
        })
        this.props.history.push("./fifty-thirty-twenty")
    }

    componentDidMount() {
        fetch("https://finplanner-api.herokuapp.com/accumulation")
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                switch (element.name) {
                    case "Четыре конверта":
                        this.setState( { shortConvert: element.short } )
                        break;
                    case "Шесть кувшинов":
                        this.setState( { shortJug: element.short } )
                        break;
                    case "Сейф":
                        this.setState( { shortSafe: element.short } )
                        break;
                    case "Обнуление":
                        this.setState( { shortZero: element.short } )
                        break;
                    case "Эффект латте":
                        this.setState( { shortLatte: element.short } )
                        break;
                    case "50/30/20":
                        this.setState( { short50_30_20: element.short } )
                        break;
                }
            });
        })
    }
    
    render(){
        let { shortConvert, shortJug, shortSafe, shortZero, shortLatte, short50_30_20 } = this.state;
        return(
            <div className="main-div-choise">
                <h1 className="h1-choise">Выберете схему накопления</h1>
                <div className="div-container">
                    <div className="div-convert">
                        <button className="button-convert" onClick={this.clickConvert}></button>
                        <p className="p-name">Метод "Четыре конверта"</p>
                        <p className="p-description">{shortConvert}</p>
                    </div>
                    <div className="div-jug">
                        <button className="button-jug" onClick={this.clickJug}></button>
                        <p className="p-name">Метод "Шесть кувшинов"</p>
                        <p className="p-description">{shortJug}</p>
                    </div>
                    <div className="div-safe">
                        <button className="button-safe" onClick={this.clickSafe}></button>
                        <p className="p-name">Метод "Сейф"</p>
                        <p className="p-description">{shortSafe}</p>
                    </div>
                </div>
                <div className="div-container">
                    <div className="div-zero">
                        <button className="button-zero" onClick={this.clickZero}></button>
                        <p className="p-name">Метод "Обнуление"</p>
                        <p className="p-description">{shortZero}</p>
                    </div>
                    <div className="div-latte">
                        <button className="button-latte" onClick={this.clickLatte}></button>
                        <p className="p-name">Метод "Эффект Латте"</p>
                        <p className="p-description">{shortLatte}</p>
                    </div>
                    <div className="div-fifty-thirty-twenty">
                        <button className="button-fifty-thirty-twenty" onClick={this.clickFiftyThirtyTwenty}></button>
                        <p className="p-name">Метод "50/30/20"</p>
                        <p className="p-description">{short50_30_20}</p>
                    </div>
                </div>
            </div>
        )
    }
}