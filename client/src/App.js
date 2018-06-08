import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import debounce from 'debounce';
import {
  Input,
  Select,
  CurrencyInput,
  SliderInput,
  DisplayGraph,
}from './components';
import { getSavings } from './services';

import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';

class App extends Component {
  state = {
    initialSavings: 0,
    monthlySavings: 0,
    yearInterest: 0,
    years: 50,
    interestPaymentFrequency: 'Annually',
    graphData: [],
  }

  activeToast = null;
 
  showError = (error) => {
    if (!toast.isActive(this.activeToast)) {
      this.activeToast = toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
  }

  formatSum = sum => sum.toFixed(2);

  callApi = debounce(params => getSavings(params)
    .then(data => this.setState({ graphData: data }))
    .catch(this.showError), 300);

  handleValueChange = field => (value) => {
    this.setState({
      [field] : value,
    }, () => {
      const {
        initialSavings,
        monthlySavings,
        yearInterest,
        years,
        interestPaymentFrequency,
      } = this.state;

      this.callApi({
        initialSavings,
        monthlySavings,
        yearInterest: yearInterest / 100,
        years,
        interestPaymentFrequency });
    });
  }

  render() {
    const {
      years,
      graphData,
    } = this.state;

    return (
      <div className="App">
        <div className="header-banner">
          <h1 className="fmz-white-font">Finimize Interest Rate Calculator</h1>
        </div>
        <ToastContainer autoClose={5000} />
				<div className="financial-inputs">
					<div>
            <p className="input-label">How much have you saved?</p>
            <CurrencyInput
              onChange={this.handleValueChange('initialSavings')}
              defaultValue={0} />

            <p className="input-label">How much will you save each month?</p>
            <CurrencyInput
              onChange={this.handleValueChange('monthlySavings')}
              defaultValue={0} />

            <p className="input-label">For how many years do you want to save?</p>
            <Input
              type="number"
              min={0}
              onChange={this.handleValueChange('years')}
              defaultValue={years} />

            <p className="input-label">How often interests are payed?</p>
            <Select
              options={['Monthly', 'Quarterly', 'Annually']}
              defaultValue={'Annually'}
              onChange={this.handleValueChange('interestPaymentFrequency')} />

            <p className="input-label">How much interest will you earn per year?</p>
            <SliderInput
              onChange={this.handleValueChange('yearInterest')}
              defaultValue={0} />
          </div>
          <div>
            {graphData && graphData.length > 0 && (
              <h1>In {years} year{years > 1 ? 's' : ''} you'll save {this.formatSum(graphData[graphData.length - 1].amount)}£</h1>
            )}
          </div>
				</div>
				<div className="financial-display">
					<DisplayGraph data={graphData}/>
				</div>
      </div>
    );
  }
}

export default App;
