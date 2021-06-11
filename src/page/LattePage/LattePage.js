import React, { Component } from "react";

import "./LattePage.css"

export default class LattePage extends Component {

    state = {
        longLatte: '',
        input: null,
        accumulation: 0//общие накопления
    }

    componentDidMount() {
        fetch("https://finplanner-api.herokuapp.com/accumulation")
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                switch (element.name) {
                    case "Эффект латте":
                        this.setState( { longLatte: element.long } )
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
        this.setState({ accumulation: (+accumulation + input).toFixed(2)}, () => {
            let { accumulation } = this.state
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
        let { longLatte, input, accumulation } = this.state
        return(
            <div className="div-main-latte">
                <div>
                    <h1 className="h1-latte">Эффект латте</h1>
                    <p className="p-long-description-latte">
                        <div className="span-latte">Этот знаменитый метод демонстрирует, как можно научиться экономить на мелочах.</div>
                        <div className="span-latte">Как пользоваться «эффектом латте» для достижения своей финансовой цели?</div>
                        <div className="span-latte">Очень просто: если вы порывались купить кофе или какую-то другую мелочь, 
                        без которой можно обойтись, отложите сумму неслучившейся покупки на отдельный счёт.</div> 
                        <div className="span-latte">Экономя пять раз в неделю по 200 рублей, к концу месяца вы получите больше 4 тысяч.</div>
                    </p>
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
                    <div className="total-amount-latte">
                        <h3 className="h3-convert">Ваши накопления</h3>
                        <p className="p-convert-summ">{accumulation} руб.</p>
                    </div>
                </div>
            </div>
        )
    }
}