import React, { Component } from "react";
import './DataCreditCalculator.css';

export default class DataCreditCalculator extends Component {
    state = {
        costResult: null,
        numberOfDevices: 100,
        dataPerDevice: 1,
        dataUnit: "MB",
        timeUnit: "day",
        dataUnits: ["KB", "MB", "GB"],
        timeUnits: ["day", "week", "month", "year"],
    };

    // Initializes anything
    componentDidMount() {
    }
 
    calculateHandler = () => {
        if (this.state.numberOfDevices > 0) {

            console.log(this.state.numberOfDevices);
            console.log(this.state.dataPerDevice);
            console.log(this.state.dataUnit);
            console.log(this.state.timeUnit);

            this.setState({ costResult: "$100" })
        } else {
            this.setState({ costResult: "Please enter a positive number of devices" })
        }
    };

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
                <h2><span>Data Credit Calculator </span> 
                <div className="Form">
                    Number of Devices
                    <input
                        name="number of devices"
                        type="text"
                        value={this.state.numberOfDevices}
                        onChange={event =>
                            this.setState({ amount: event.target.value })
                        }>
                    </input>
                    Data
                    <input
                        name="data per device"
                        type="text"
                        value={this.state.dataPerDevice}
                        onChange={event =>
                            this.setState({ amount: event.target.value })
                        }>
                    </input>
                    <select
                        name="data unit"
                        onChange={(event) => this.selectHandler(event)}
                        value={this.state.dataUnit}>

                        {this.state.dataUnits.map(cur => (
                            <option key={cur}>{cur}</option>
                        ))}
                    </select>
                    per
                    <select
                        name="time unit"
                        onChange={(event) => this.selectHandler(event)}
                        value={this.state.timeUnit}>

                        {this.state.timeUnits.map(cur => (
                            <option key={cur}>{cur}</option>
                        ))}
                    </select>

                    <button onClick={this.calculateHandler}>Calculate</button>
                </div>
                </h2>
                {this.state.costResult && 
                    <h3>{this.state.costResult}</h3>
                }
            </div>
        );
    }
}

// export default DataCreditCalculator;