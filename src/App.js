import React from 'react';
import './App.css';
import {TextField, Button} from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <body className="App-body">
        <Button variant="contained">Calculate</Button>
        <form noValidate autoComplete="off">
          <TextField id="number-of-devices" label="Number of Devices" variant="outlined" />
          <TextField id="mb-per-device-per-day" label="MB of data/day/device" variant="outlined" />
        </form>
      </body>
    </div>
  );
}

export default App;
