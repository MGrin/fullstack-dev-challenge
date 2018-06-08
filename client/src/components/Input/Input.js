import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Input.css'

export default class Input extends Component {
	constructor(props) {
		super(props)

		this.state = {
			hasFocus: false,
			value: props.defaultValue
		}
	}

	handleChange(e) {
		const value = e.target.value;
    this.setState({ value });

    this.props.onChange(this.props.type === 'number' || this.props.type === 'range' ? Number(value) : value);
	}

	handleFocus(e) {
		this.setState({
			hasFocus: true
		})
  }

	render() {
		const { defaultValue, ...inputProps } = this.props
		const { value } = this.state

		return (
			<div className={`input ${value === defaultValue ? 'default-value' : ''}`}>
				<input
          value={value}
          {...inputProps}
					onChange={this.handleChange.bind(this)}
					onFocus={this.handleFocus.bind(this)} />
			</div>
		)
	}
}

Input.propTypes = {
  defaultValue: PropTypes.number,
  type: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  onChange: () => {},
};

