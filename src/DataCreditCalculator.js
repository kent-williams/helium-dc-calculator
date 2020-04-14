import React, { Component } from "react";
import './DataCreditCalculator.css';

const dataCreditValue = 0.00001;
const bytesPerHeliumPacket = 24;

export default class DataCreditCalculator extends Component {
    state = {
        costResult: null,
        numberOfDevices: 100,
        packetsPerDevice: 1,
        dataFrequency: "Hour",
        timeUnit: "Day",
        dataFrequencies: {"Minute": 1440, "Hour": 24, "Day": 1},
        timeUnits: {"Day": 1, "Week": 7, "Month": 29.53059, "Year": 365},
    };

    // Time Unit Output, does not need to re-render until user calculates
    timeUnitFixed = "Day";

    currencyFormat(num) {
        if (num >= 0.01) {
            return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
        else if (num > 0.0001) {
            return '$' + num.toFixed(4);
        }
        else if (num > 0.000001) {
            return '$' + num.toFixed(6);
        }
        else {
            return '$' + num.toFixed(8);
        }
    }
  
    calculateHandler = () => {
        if (this.state.numberOfDevices > 0 && this.state.packetsPerDevice > 0) {

            var totalPacketsPerDay = 0;
            var totalDays = 0;
            var totalCost = 0;

            totalPacketsPerDay = this.state.dataFrequencies[this.state.dataFrequency] / this.state.packetsPerDevice; 
            totalDays = this.state.timeUnits[this.state.timeUnit];
            totalCost = (dataCreditValue * this.state.numberOfDevices * totalPacketsPerDay * totalDays);

            this.timeUnitFixed = this.state.timeUnit;

            // console.log(totalPacketsPerDay);
            // console.log(this.state.numberOfDevices);
            // console.log(this.state.packetsPerDevice);
            // console.log(this.state.dataFrequency);
            // console.log(this.state.timeUnit);

            this.setState({ costResult: this.currencyFormat(totalCost) + ' a ' + this.timeUnitFixed})
        } else {
            this.setState({ costResult: "Please enter a positive number of devices and packets." })
        }
    };

    // Updates the states based on the input that was changed
    inputHandler = (event) => {
        if (event.target.name === "number of devices") {
            this.setState({ numberOfDevices: event.target.value })
        }
        if (event.target.name === "packets per device") {
            this.setState({ packetsPerDevice: event.target.value })
        }
    }

    // Updates the states based on the dropdown that was changed
    selectHandler = (event) => {
        if (event.target.name === "data frequency") {
            this.setState({ dataFrequency: event.target.value })
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
                    <div>
                        Number of Devices
                        <input
                            name="number of devices"
                            type="number"
                            value={this.state.numberOfDevices}
                            onChange={this.inputHandler}
                            min="1"
                        />
                    </div>
                    <div>
                        Device Transmits a Packet every
                        <input
                            name="packets per device"
                            type="number"
                            value={this.state.packetsPerDevice}
                            onChange={this.inputHandler}
                            min="1"
                        />
                        <select
                            name="data frequency"
                            onChange={(event) => this.selectHandler(event)}
                            value={this.state.dataFrequency}>

                            {Object.keys(this.state.dataFrequencies).map(value => (
                                <option key={value}>{value}</option>
                            ))} 
                        </select>
                    </div>
                    <div>
                        Total Cost for Devices per 
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
                </div>
                {this.state.costResult && 
                    <h3>{this.state.costResult}</h3>
                }
            </div>
        );
    }
}

// export default DataCreditCalculator;