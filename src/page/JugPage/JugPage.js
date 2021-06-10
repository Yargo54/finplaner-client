import React, { Component } from "react";

import "./JugPage.css"

export default class JugPage extends Component {

    state = {
        longJug: '',
        input: null,
        financialGoals: 0,
        mandatorySpending: 0,
        save: 0,
        hobby: 0,
        spender: 0,
        presents: 0,
        accumulation: 0//общие накопления
    }

    componentDidMount() {
        fetch("http://localhost:3000/accumulation")
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                switch (element.name) {
                    case "Шесть кувшинов":
                        this.setState( { longJug: element.long } )
                        break;
                }
            });
        })
    }

    clickAddSumm = () => {
        let { input, accumulation } = this.state;
        this.setState( { accumulation:  (+accumulation + input).toFixed(2)}, () => {
            let { accumulation } = this.state;
            let financialGoals = (+accumulation * 0.1).toFixed(2);
            let mandatorySpending = (+accumulation * 0.55).toFixed(2);
            let save = (+accumulation * 0.1).toFixed(2)
            let hobby = (+accumulation * 0.1).toFixed(2)
            let spender = (+accumulation * 0.1).toFixed(2)
            let presents =  (+accumulation * 0.05).toFixed(2)
            this.setState( { 
                financialGoals, 
                mandatorySpending,
                save,
                hobby,
                spender,
                presents,
            } );
        } );
    }

    updateInputValue = (event) => {
        this.setState( { input: +event.target.value } );
    }

    render() {
        let { longJug, financialGoals, mandatorySpending, save, hobby, spender, presents, input, accumulation } = this.state
        return(
            <div className="div-main-jug">
                <div>
                    <h1 className="h1-jug">Шесть кувшинов</h1>
                    <p className="p-long-description-jug">{longJug}</p>
                </div>
                <div className="div-button-summ">
                    <button className="button-add-summ" onClick={this.clickAddSumm}>Добавить сумму</button>
                    <input type="number" className="input-add-summ" value={input} onChange={this.updateInputValue}/>
                </div>
                <div className="div-with-summ">
                    <div className="div-distribution-jug">
                        <h3 className="h3-convert">На обязательные траты</h3>
                        <p className="p-convert-summ">{mandatorySpending} руб.</p>
                        <h3 className="h3-convert">Сбережения</h3>
                        <p className="p-convert-summ">{save} руб.</p>
                        <h3 className="h3-convert">Дорогие, но не обязательные покупки</h3>
                        <p className="p-convert-summ">{financialGoals} руб.</p>
                        <h3 className="h3-convert">Обучение, саморазвитие, хобби</h3>
                        <p className="p-convert-summ">{hobby} руб.</p>
                        <h3 className="h3-convert">Транжирство</h3>
                        <p className="p-convert-summ">{spender} руб.</p>
                        <h3 className="h3-convert">Подарки и благотворительность</h3>
                        <p className="p-convert-summ">{presents} руб.</p>
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