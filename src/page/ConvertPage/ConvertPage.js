import React, { Component } from "react";

import "./ConvertPage.css"

export default class ConvertPage extends Component {

    state = {
        longConvert: '',
        input: null,
        financialGoals: 0,
        mandatorySpending: 0,
        convert: 0,
        accumulation: 0//общие накопления
    }

    componentDidMount() {
        fetch("https://finplanner-api.herokuapp.com/accumulation")
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                switch (element.name) {
                    case "Четыре конверта":
                        this.setState( { longConvert: element.long } )
                        break;
                }
            });
        });

        let login = {
            login: localStorage.getItem("login")
        }

        fetch(`https://finplanner-api.herokuapp.com/updateMoney${login ? `?login=${localStorage.getItem("login")}` : ''}`)
        .then(res => res.json())
        .then(data => {
            this.setState({ accumulation: data.allMoney });
        })
        .catch((err) => {
            alert(err)
        })
    }

    componentWillUnmount(){
        this.setState( { accumulation: 0 } )
    }
     
    clickAddSumm = () => {
        let { input, accumulation } = this.state;

        this.setState( { accumulation: (+accumulation + input).toFixed(2) }, () => {
            let { accumulation } = this.state;
            let financialGoals =  (+accumulation * 0.1).toFixed(2);
            let mandatorySpending =  (+accumulation * 0.55).toFixed(2)

            this.setState( {
                financialGoals,
                mandatorySpending,
                convert: ((+accumulation - (+financialGoals + +mandatorySpending)) / 4).toFixed(2)
            });

            let UpdateAllMoney = {
                allMoney: accumulation,
                login: localStorage.getItem('login')
            }

            fetch('https://finplanner-api.herokuapp.com/update', {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(UpdateAllMoney)
            })
            .catch((err) => {
                alert(err)
            })
        });
    }

    updateInputValue = (event) => {
        this.setState( { input: +event.target.value } );
    }

    render() {
        let { longConvert, input, financialGoals, mandatorySpending, convert, accumulation } = this.state 
        return(
            <div className="div-main-convert">
                <div>
                    <h1 className="h1-convert">Четыре конверта</h1>
                    <p className="p-long-description-convert">{longConvert}</p>
                </div>
                <div className="div-button-summ">
                    <button className="button-add-summ" onClick={this.clickAddSumm}>Добавить сумму</button>
                    <input type="number" className="input-add-summ" value={input} onChange={this.updateInputValue}/>
                </div>
                <div className="div-with-summ">
                    <div className="div-distribution">
                        <h3 className="h3-convert">На финансовые цели</h3>
                        <p className="p-convert-summ">{financialGoals} руб.</p>
                        <h3 className="h3-convert">На обязательные траты</h3>
                        <p className="p-convert-summ">{mandatorySpending} руб.</p>
                        <h3 className="h3-convert">Конверт №1</h3>
                        <p className="p-convert-summ">{convert} руб.</p>
                        <h3 className="h3-convert">Конверт №2</h3>
                        <p className="p-convert-summ">{convert} руб.</p>
                        <h3 className="h3-convert">Конверт №3</h3>
                        <p className="p-convert-summ">{convert} руб.</p>
                        <h3 className="h3-convert">Конверт №4</h3>
                        <p className="p-convert-summ">{convert} руб.</p>
                    </div>
                    <div className="total-amount">
                        <h3 className="h3-convert">Ваши накопления</h3>
                        <p className="p-convert-summ">{accumulation} руб.</p>
                    </div>
                </div>
            </div>
        )
    }
}