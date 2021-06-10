import React, { Component } from "react";

import "./SafePage.css"

export default class SafePage extends Component {

    state = {
        longSafe: '',
        input: null,
        save: 0,
    }

    componentDidMount() {
        fetch("http://localhost:3000/accumulation")
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
    }

    clickAddSumm = () => {
        let { input } = this.state;
        this.setState( { save: (input * 0.15).toFixed(2) } );
    }

    updateInputValue = (event) => {
        this.setState( { input: +event.target.value } );
    }

    render() {
        let { longSafe, input, save } = this.state
        return(
            <div className="div-main-safe">
                <div>
                    <h1 className="h1-safe">Сейф</h1>
                    <p className="p-long-description-safe">{longSafe}</p>
                </div>
                <div className="div-button-summ">
                    <button className="button-add-summ" onClick={this.clickAddSumm}>Добавить сумму</button>
                    <input type="number" className="input-add-summ" value={input} onChange={this.updateInputValue}/>
                </div>
                <div className="div-with-summ">
                    {/* <div className="div-distribution">
                        <h3 className="h3-convert">Сбережения</h3>
                        <p className="p-convert-summ">{save} руб.</p>
                    </div> */}
                    <div className="total-amount-safe">
                        <h3 className="h3-convert">Ваши накопления</h3>
                        <p className="p-convert-summ">{save} руб.</p>
                    </div>
                </div>
            </div>
        )
    }
}