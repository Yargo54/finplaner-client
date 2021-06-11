import React, { Component } from "react";

import "./ConvertPage.css"

export default class ConvertPage extends Component {

    state = {
        longConvert: '',
        input: null,
        financialGoals: 0,
        mandatorySpending: 0,
        convert1: 0,
        convert2: 0,
        convert3: 0,
        convert4: 0,
        accumulation: 0,//общие накопления
        inputOsnova: null,
        inputTarget: null,
        inputConvert1: null,
        inputConvert2: null,
        inputConvert3: null,
        inputConvert4: null,
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

        let login = localStorage.getItem("login")

        fetch(`https://finplanner-api.herokuapp.com/updateMoney${login ? `?login=${login}` : ''}`)
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
            let financialGoals =  (+accumulation * 0.1).toFixed(2);
            let mandatorySpending =  (+accumulation * 0.55).toFixed(2)

            this.setState( {
                financialGoals,
                mandatorySpending,
                convert1: ((+accumulation - (+financialGoals + +mandatorySpending)) / 4).toFixed(2),
                convert2: ((+accumulation - (+financialGoals + +mandatorySpending)) / 4).toFixed(2),
                convert3: ((+accumulation - (+financialGoals + +mandatorySpending)) / 4).toFixed(2),
                convert4: ((+accumulation - (+financialGoals + +mandatorySpending)) / 4).toFixed(2),
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

    //Цель
    updateInputValueTarget = (event) => {
        this.setState( { inputTarget: +event.target.value } );
    }
    deleteTarget = () => {
        let { inputTarget, financialGoals, accumulation} = this.state;
        if(financialGoals !== 0){
            this.setState( { financialGoals: (financialGoals - inputTarget).toFixed(2) }, () => {
                this.setState( { accumulation: (accumulation - inputTarget).toFixed(2)}, () => {
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
                } )
            });
        }
    }
    //Основыне
    updateInputValueOsnova = (event) => {
        this.setState( { inputOsnova: +event.target.value } );
    }
    deleteOsnova = () => {
        let { inputOsnova, mandatorySpending, accumulation} = this.state;
        if(mandatorySpending !== 0) {
            this.setState( { mandatorySpending: (mandatorySpending - inputOsnova).toFixed(2)}, () => {
               this.setState( { accumulation: (accumulation - inputOsnova).toFixed(2) }, () => {
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
            })
        });
    }
}
    //Конверт1
    updateInputValueConvert1 = (event) => {
        this.setState( { inputConvert1: +event.target.value } );
    }
    deleteConvert1 = () => {
        let { inputConvert1, convert1, accumulation} = this.state;
        if(convert1 !== 0){
            this.setState( { convert1: (convert1 - inputConvert1).toFixed(2)}, () => {
                this.setState( { accumulation: (accumulation - inputConvert1).toFixed(2) }, () => {
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
                })
            } );
        }
    }
    //Конверт2
    updateInputValueConvert2 = (event) => {
        this.setState( { inputConvert2: +event.target.value } );
    }
    deleteConvert2 = () => {
        let { inputConvert2, convert2, accumulation} = this.state;
        if(convert2 !== 0){
            this.setState( { convert2: (convert2 - inputConvert2).toFixed(2)}, () => {
                this.setState({accumulation: (accumulation - inputConvert2).toFixed(2)}, () => {
                    let {accumulation} = this.state;
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
                })
            } );
        }
    }
    //Конверт3
    updateInputValueConvert3 = (event) => {
        this.setState( { inputConvert3: +event.target.value } );
    }
    deleteConvert3 = () => {
        let { inputConvert3, convert3, accumulation} = this.state;
        if(convert3 !== 0){
            this.setState( { convert3: (convert3 - inputConvert3).toFixed(2)}, () => {
                this.setState({accumulation: (accumulation - inputConvert3).toFixed(2)}, () =>{
                    let {accumulation} = this.state;
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
                })
            } );
        }   
    }
    //Конверт4
    updateInputValueConvert4 = (event) => {
        this.setState( { inputConvert4: +event.target.value } );
    }
    deleteConvert4 = () => {
        let { inputConvert4, convert4, accumulation} = this.state;
        if(convert4 !== 0){
            this.setState( { convert4: (convert4 - inputConvert4).toFixed(2)}, ()=> {
                this.setState({accumulation: (accumulation - inputConvert4).toFixed(2)}, () => {
                    let {accumulation} = this.state;
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
                })
            });
        }
    }

    render() {
        let { input, financialGoals, mandatorySpending, convert1, convert2, convert3, convert4, accumulation, inputOsnova, inputTarget, inputConvert1, inputConvert2, inputConvert3, inputConvert4 } = this.state 
        return(
            <div className="div-main-convert">
                <div>
                    <h1 className="h1-convert">Четыре конверта</h1>
                    <p className="p-long-description-convert">
                        Чтобы воспользоваться этим методом, нужно выполнить следующие действия:
                        <ul className="ul-convert">
                            <li>подсчитать общую сумму доходов семьи за месяц;</li>
                            <li>затем вычесть из неё деньги на среднесрочные и долгосрочные финансовые цели (примерно 15%) и «положить» их в копилку;</li>
                            <li>из остатка нужно вычесть деньги на обязательные расходы (платежи по кредитам, коммунальные услуги, оплата детского сада, бензин и т. д.);</li>
                            <li>оставшуюся сумму делим на четыре части и кладём в четыре конверта: это ваш бюджет на неделю;</li>
                        </ul> 
                        Деньги из недельного конверта можно тратить как угодно, главное — не превышать выделенного лимита.
                    </p>
                </div>
                <div className="div-button-summ">
                    <button className="button-add-summ" onClick={this.clickAddSumm}>Добавить сумму</button>
                    <input type="number" className="input-add-summ" value={input} onChange={this.updateInputValue}/>
                </div>
                <div className="div-with-summ">
                    <div className="div-distribution">
                        <h3 className="h3-convert">На финансовые цели</h3>
                        <p className="p-convert-summ">{financialGoals} руб.</p>
                        <button className="sliding-button" onClick={this.deleteTarget}>Списать</button>
                        <br />
                        <input className="input-spisanye" onChange={this.updateInputValueTarget} value={inputTarget} type="number"/>

                        <h3 className="h3-convert">На обязательные траты</h3>
                        <p className="p-convert-summ">{mandatorySpending} руб.</p>
                        <button className="sliding-button" onClick={this.deleteOsnova}>Списать</button>
                        <br />
                        <input className="input-spisanye" onChange={this.updateInputValueOsnova} value={inputOsnova} type="number"/>
                        
                        <h3 className="h3-convert">Конверт №1</h3>
                        <p className="p-convert-summ">{convert1} руб.</p>
                        <button className="sliding-button" onClick={this.deleteConvert1}>Списать</button>
                        <br />
                        <input className="input-spisanye" onChange={this.updateInputValueConvert1} value={inputConvert1} type="number"/>

                        <h3 className="h3-convert">Конверт №2</h3>
                        <p className="p-convert-summ">{convert2} руб.</p>
                        <button className="sliding-button" onClick={this.deleteConvert2}>Списать</button>
                        <br />
                        <input className="input-spisanye" onChange={this.updateInputValueConvert2} value={inputConvert2} type="number"/>

                        <h3 className="h3-convert">Конверт №3</h3>
                        <p className="p-convert-summ">{convert3} руб.</p>
                        <button className="sliding-button" onClick={this.deleteConvert3}>Списать</button>
                        <br />
                        <input className="input-spisanye" onChange={this.updateInputValueConvert3} value={inputConvert3} type="number"/>

                        <h3 className="h3-convert">Конверт №4</h3>
                        <p className="p-convert-summ">{convert4} руб.</p>
                        <button className="sliding-button" onClick={this.deleteConvert4}>Списать</button>
                        <br />
                        <input className="input-spisanye end-button" onChange={this.updateInputValueConvert4} value={inputConvert4} type="number"/>

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