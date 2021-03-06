import React, { Component } from "react";

import "./ZeroPage.css"

export default class ZeroPage extends Component {

    state = {
        longZero: '',
        input: null,
        accumulation: 0//общие накопления
    }

    componentDidMount() {
        fetch("https://finplanner-api.herokuapp.com/accumulation")
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                switch (element.name) {
                    case "Обнуление":
                        this.setState( { longZero: element.long } )
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
        let { input, accumulation } = this.state;
        this.setState( { accumulation: +accumulation + (input % 100) }, () => {
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
        let { longZero, input, accumulation } = this.state
        return(
            <div className="div-main-zero">
                <div>
                    <h1 className="h1-zero">Обнуление</h1>
                    <p className="p-long-description-zero">
                        <div className="span-zero">Суть метода заключается в том, что каждый вечер нужно «обнулять» свои счета и кошельки.</div>
                        <div className="span-zero">В среднем подойдёт «обнуление» счёта до двух нулей.</div>
                        <div className="span-zero">Например с 15434 руб. на сбережения уйдут 34 руб.</div>
                        <div className="span-zero">Если вы забыли обнулить счёт, то на следующий день нужно дополнительно внести в копилку «штраф» — 100 руб.</div>
                    </p>
                </div>
                <div className="div-button-summ">
                    <button className="button-add-summ" onClick={this.clickAddSumm}>Добавить сумму</button>
                    <input type="number" className="input-add-summ" value={input} onChange={this.updateInputValue}/>
                </div>
                <div className="div-with-summ">
                    {/* <div className="div-distribution">
                        <h3 className="h3-convert">Накопления</h3>
                        <p className="p-convert-summ">{save} руб.</p>
                    </div> */}
                    <div className="total-amount-zero">
                        <h3 className="h3-convert">Ваши накопления</h3>
                        <p className="p-convert-summ">{accumulation} руб.</p>
                    </div>
                </div>
            </div>
        )
    }
}