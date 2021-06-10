import React, { Component } from "react";

import "./ZeroPage.css"

export default class ZeroPage extends Component {

    state = {
        longZero: '',
        input: null,
        accumulation: 0//общие накопления
    }

    componentDidMount() {
        fetch("http://localhost:3000/accumulation")
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
    }

    clickAddSumm = () => {
        let { input } = this.state;
        this.setState( { accumulation: (input % 100) } );
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
                    <p className="p-long-description-zero">{longZero}</p>
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