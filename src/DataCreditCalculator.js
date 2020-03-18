import React, { Component } from "react";
import './DataCreditCalculator.css';

const dataCreditValue = 0.00001;
const bytesPerHeliumPacket = 24;

export default class DataCreditCalculator extends Component {
    state = {
        costResult: null,
        numberOfDevices: 100,
        dataPerDevice: 1,
        dataUnit: "Bytes",
        timeUnit: "Day",
        dataUnits: {"Bytes": 1, "KB": 1000, "MB": 1000000, "GB": 1000000000},
        timeUnits: {"Day": 1, "Week": 7, "Month": 29.53059, "Year": 365},
    };

    // Time Unit Output, does not need to re-render until user calculates
    timeUnitFixed = "Day";

    currencyFormat(num) {
        if (num > 1) {
            return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
        else{
            return '$' + num.toFixed(8);
        }
    }
  
    calculateHandler = () => {
        if (this.state.numberOfDevices > 0 && this.state.dataPerDevice > 0) {

            var totalBytes = this.state.dataPerDevice * this.state.dataUnits[this.state.dataUnit]; 
            var totalDays = this.state.timeUnits[this.state.timeUnit];
            var totalCost = (dataCreditValue * this.state.numberOfDevices * totalBytes * totalDays) / bytesPerHeliumPacket;

            this.timeUnitFixed = this.state.timeUnit;

            console.log(this.state.numberOfDevices);
            console.log(this.state.dataPerDevice);
            console.log(this.state.dataUnit);
            console.log(this.state.timeUnit);

            this.setState({ costResult: this.currencyFormat(totalCost) + ' a ' + this.timeUnitFixed})
        } else {
            this.setState({ costResult: "Please enter a positive number of devices and data." })
        }
    };

    // Updates the states based on the input that was changed
    inputHandler = (event) => {
        if (event.target.name === "number of devices") {
            this.setState({ numberOfDevices: event.target.value })
        }
        if (event.target.name === "data per device") {
            this.setState({ dataPerDevice: event.target.value })
        }
    }

    // Updates the states based on the dropdown that was changed
    selectHandler = (event) => {
        if (event.target.name === "data unit") {
            this.setState({ dataUnit: event.target.value })
        }
        if (event.target.name === "time unit") {
            this.setState({ timeUnit: event.target.value })
        }
    }

    render() {
        return (
            <div className="DataCreditCalculator">
                <h1><span>Helium Data Credit Calculator </span></h1>
                <h2><span>Current Price of Data Credit = ${dataCreditValue} </span></h2>
                <h2><span>Bytes per packet = {bytesPerHeliumPacket} </span></h2>
                <div className="Form">
                    Number of Devices
                    <input
                        name="number of devices"
                        type="number"
                        value={this.state.numberOfDevices}
                        onChange={this.inputHandler}
                        min="1"
                    />
                    Data
                    <input
                        name="data per device"
                        type="number"
                        value={this.state.dataPerDevice}
                        onChange={this.inputHandler}
                        min="1"
                    />
                    <select
                        name="data unit"
                        onChange={(event) => this.selectHandler(event)}
                        value={this.state.dataUnit}>

                        {Object.keys(this.state.dataUnits).map(value => (
                            <option key={value}>{value}</option>
                        ))} 
                    </select>
                    per
                    <select
                        name="time unit"
                        onChange={(event) => this.selectHandler(event)}
                        value={this.state.timeUnit}>

                        {Object.keys(this.state.timeUnits).map(value => (
                            <option key={value}>{value}</option>
                        ))}
                    </select>
                    <button onClick={this.calculateHandler}>Calculate</button>
                </div>
                {this.state.costResult && 
                    <h3>{this.state.costResult}</h3>
                }
            </div>
        );
    }
}

// export default DataCreditCalculator;