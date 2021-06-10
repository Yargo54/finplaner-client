import React, { Component } from "react";

import "./FiftyThirtyTwentyPage.css"

export default class FiftyThirtyTwentyPage extends Component {

    state = {
        long50_30_20: '',
        input: null,
        financialGoals: 0,
        mandatorySpending: 0,
        save: 0,
        accumulation: 0//общие накопления
    }

    componentDidMount() {
        fetch("http://localhost:3000/accumulation")
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                switch (element.name) {
                    case "50/30/20":
                        this.setState( { long50_30_20: element.long } )
                        break;
                }
            });
        })

        let login = {
            login: localStorage.getItem("login")
        }

        fetch(`http://localhost:3000/updateMoney${login ? `?login=${localStorage.getItem("login")}` : ''}`)
        .then(res => res.json())
        .then(data => {
            this.setState({ accumulation: data.allMoney });
        })
        .catch((err) => {
            alert(err)
        })
    }

    clickAddSumm = () => {
        let { input, accumulation } = this.state;
        this.setState( { accumulation: (+accumulation + input).toFixed(2) }, () => {
            let { accumulation } = this.state;
            let financialGoals = (+accumulation * 0.3).toFixed(2);
            let mandatorySpending = (+accumulation * 0.5).toFixed(2);
            let save = (input * 0.2).toFixed(2)
            this.setState( { 
                financialGoals,
                mandatorySpending,
                save,
            });
            // let UpdateAllMoney = {
            //     allMoney: accumulation,
            //     login: localStorage.getItem('login')
            // }

            // fetch('http://localhost:3000/update', {
            // method: "PUT",
            // headers: {
            //     "Content-type": "application/json",
            // },
            // body: JSON.stringify(UpdateAllMoney)
            // })
            // .catch((err) => {
            //     alert(err)
            // })
        });
    }

    updateInputValue = (event) => {
        this.setState( { input: +event.target.value } );
    }

    render() {
        let { long50_30_20, financialGoals, mandatorySpending, save, input, accumulation } = this.state
        return(
            <div className="div-main-fifty-thirty-twenty">
                <div>
                    <h1 className="h1-fifty-thirty-twenty">50/30/20</h1>
                    <p className="p-long-description-fifty-thirty-twenty">{long50_30_20}</p>
                </div>
                <div className="div-button-summ">
                    <button className="button-add-summ" onClick={this.clickAddSumm}>Добавить сумму</button>
                    <input type="number" className="input-add-summ" value={input} onChange={this.updateInputValue}/>
                </div>
                <div className="div-with-summ">
                    <div className="div-distribution">
                        <h3 className="h3-convert">На обязательные траты</h3>
                        <p className="p-convert-summ">{mandatorySpending} руб.</p>
                        <h3 className="h3-convert">На желаемые траты</h3>
                        <p className="p-convert-summ">{financialGoals} руб.</p>
                        <h3 className="h3-convert">Сбережения</h3>
                        <p className="p-convert-summ">{save} руб.</p>
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