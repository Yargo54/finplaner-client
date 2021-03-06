import React, { Component } from "react";

import "./SafePage.css"

export default class SafePage extends Component {

    state = {
        longSafe: '',
        input: null,
        accumulation: 0,
    }

    componentDidMount() {
        fetch("https://finplanner-api.herokuapp.com/accumulation")
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                switch (element.name) {
                    case "Четыре конверта":
                        this.setState( { longSafe: element.long } )
                        break;
                }
            });
        })

        let login = localStorage.getItem("login")

        fetch(`https://finplanner-api.herokuapp.com/updateMoney${login ? `?login=${login}` : ''}`)
        .then(res => res.json())
        .then(data => {
            this.setState({ accumulation: data ? data.allMoney : 0 });
        })
        .catch((err) => {
            alert(err)
        })
    }

    clickAddSumm = () => {
        let { input } = this.state;
        this.setState( { accumulation: (input * 0.15).toFixed(2) }, () => {
            let { accumulation } = this.state; 

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
        let { longSafe, input, accumulation } = this.state
        return(
            <div className="div-main-safe">
                <div>
                    <h1 className="h1-safe">Сейф</h1>
                    <p className="p-long-description-safe">
                        <div className="span-zero">Этот метод не предусматривает полноценной системы ведения бюджета, а фокусируется только на накоплении.</div>
                        <div className="span-zero">Следовать ему очень просто - в самом простом варианте с каждого денежного поступления необходимо откладывать по 15% на сбережения.</div>
                    </p>
                </div>
                <div className="div-button-summ">
                    <button className="button-add-summ" onClick={this.clickAddSumm}>Добавить сумму</button>
                    <input type="number" className="input-add-summ" value={input} onChange={this.updateInputValue}/>
                </div>
                <div className="div-with-summ">
                    <div className="total-amount-safe">
                        <h3 className="h3-convert">Ваши накопления</h3>
                        <p className="p-convert-summ">{accumulation} руб.</p>
                    </div>
                </div>
            </div>
        )
    }
}