import React, { Component } from 'react';

const styles = {
	tokenField: {
		margin: '6px 0'
	},
	digitInputBox: {
		padding: 2,
		margin: '0 2px',
		border: '1px solid #ccc',
		borderRadius: 1,
		width: '1em',
		font: 'inherit',
		fontSize: 24,
		textAlign: 'center'
	},

};

export default class OTPForm extends Component {

	constructor(props, context) {
		super(props, context);
		this.digitInputs = [];
		this.state = {
			time: '',
			changed: false
		};
	}

	static defaultProps = {
		label: 'Time'
	}

	componentDidMount() {
		this.digitInputs[0].focus();
	}

	componentDidUpdate() {
		if (!(this.state.time.length < 5) && this.state.changed) {
			this.props.handleTime(this.state.time)
			this.setState(
				{
					changed: false,
				})
		}
	}


	render() {
		return (
			<div style={{ ...this.props.style, display: 'flex' }}>
				<div style={{
					display: 'flex', alignItems: 'center', marginRight: 10
				}}>
					{this.props.label}
				</div>
				<div style={styles.tokenField}>
					{new Array(5).fill(0).map((v, i) => {
						if (i == 2) {
							return ':'
						} else {
							return (
								<input
									key={i}
									type="tel"
									name={`digit${i}`}
									value={null}
									maxLength="1"
									style={styles.digitInputBox}
									ref={input => this.digitInputs[i] = input}
									onKeyDown={this.onDigitKeyDown.bind(this)}
									onKeyUp={this.onDigitKeyUp.bind(this)}
								/>
							)
						}
					}
					)}
				</div>
			</div>
		)
	}

	onDigitKeyDown(event) {
		let keyCode = event.keyCode;

		if (keyCode >= 96) {
			keyCode -= 48;
		}

		if ((keyCode >= 48 && keyCode <= 57)) {
			event.target.value = String.fromCharCode(keyCode);
		} else {
			event.preventDefault();
		}
	}

	onDigitKeyUp(event) {
		event.preventDefault();
		const keyCode = event.keyCode;
		if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) {
			const digitIndex = parseInt(event.target.name.replace('digit', ''));
			if (digitIndex < this.digitInputs.length - 1) {
				// auto-focus next digit
				if (digitIndex == 1) {
					this.digitInputs[digitIndex + 2].focus();
				} else {
					this.digitInputs[digitIndex + 1].focus();
				}

			} else {
				this.digitInputs[digitIndex].blur();
			}

			this.setState({
				time: this.digitInputs.reduce((time, input, index) => {
					if (index == 3) {
						return time + ':' + input.value
					} else {
						return time + input.value;
					}

				}, ''),
				changed: true
			});
		}
	}
}