import React, { Component } from 'react';
import { colors } from 'material-ui/styles';
import { AlertWarning } from 'material-ui/svg-icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Paths } from '../../enums';
import RaisedButton from 'material-ui/RaisedButton';
import { MessageBox } from '../common';
import { TextField } from 'material-ui';
import { AuthActions } from '../../actions';

const styles = {
	background: {
		backgroundColor: colors.white,
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},

	whiteContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		width: 500,
		borderRadius: 0,
		padding: 32,
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: colors.white,
		boxShadow: '0 -3px 24px rgba(0, 0, 0, 0.25)',
		overflowY: 'scroll',
		overflowX: 'hidden',
		'@media (max-width: 640px)': {
			left: 0,
			width: '100%'
		}
	},

	headerStyle: {
		fontWeight: 'lighter',
		color: colors.grey800,
		fontSize: '34px'
	},
	subheaderStyle: {
		fontWeight: 'lighter',
		color: colors.grey800,
		fontSize: '16px'
	},
	errorMessage: {
		display: 'flex',
		alignItems: 'middle',
		padding: '8px 16px',
		borderRadius: 2,
		backgroundColor: colors.red500,
		color: colors.white,
	}
}

class Login extends Component {

	state = {
		email: null,
		password: null,
		page: 'login'
	}

	render() {
		let page

		switch (this.state.page) {
			case 'sign-up': page = this._renderSignUpForm();
				break;
			case 'login': page = this._renderLoginForm();
				break;
		}

		return (
			<div style={styles.background}>
				<div style={styles.whiteContainer}>
					{page}
					<MessageBox />
				</div>
			</div>
		)
	}

	componentWillReceiveProps() {
		if (sessionStorage.getItem('@@mc/USERID')) {
			this.props.history.push(Paths.DAY_CALENDAR)
		}
	}

	_renderLoginForm() {
		return (
			<div
				style={{
					...styles.step, justifyContent: 'space-between', flex: 4, display: 'flex', flexDirection: 'column'
				}}
			>
				<div style={{ ...styles.headerStyle, marginBottom: 10 }}>
					<div style={{ fontWeight: 'bold' }}>
						My Day Calendar
					</div>
				</div>
				<div style={{ flex: 1, flexGrow: 1, marginTop: 25 }}>
					<div>
						<TextField
							floatingLabelText="Email"
							fullWidth={true}
							value={this.state.email ? this.state.email : null}
							onChange={(event, value) => {
								this.setState({
									email: value
								})
							}}
						/>
						<TextField
							floatingLabelText="Password"
							type="password"
							fullWidth={true}
							value={this.state.password ? this.state.password : null}
							onChange={(event, value) => {
								this.setState({
									password: value
								})
							}}
						/>
					</div>
					<div style={{ margin: 25 }} />
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<RaisedButton
							label="Login"
							style={{ marginTop: 24 }}
							primary={true}
							disabled={!(this.state.email && this.state.password)}
							onClick={() => this.props.submitLogin(this.state.email, this.state.password)}
						/>
					</div>
					<div style={{ height: 20 }} />
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<RaisedButton
							label="Sign Up"
							secondary={true}
							onClick={() => {
								this.setState({
									page: 'sign-up',
									email: null,
									password: null
								})
							}}
						/>
					</div>
				</div>
			</div>
		)
	}

	_renderSignUpForm() {
		return (
			<div
				style={{
					...styles.step, justifyContent: 'space-between', flex: 4, display: 'flex', flexDirection: 'column'
				}}
			>
				<div style={{ ...styles.headerStyle, marginBottom: 10 }}>
					<div style={{ fontWeight: 'bold' }}>
						Sign Up
					</div>
				</div>
				<div style={{ flex: 1, flexGrow: 1, marginTop: 25 }}>
					<div>
						<TextField
							floatingLabelText="Email"
							fullWidth={true}
							value={this.state.email ? this.state.email : null}
							onChange={(event, value) => {
								this.setState({
									email: value
								})
							}}
						/>
						<TextField
							floatingLabelText="Password"
							type="password"
							fullWidth={true}
							value={this.state.password ? this.state.password : null}
							onChange={(event, value) => {
								this.setState({
									password: value
								})
							}}
						/>
					</div>
					<div style={{ margin: 25 }} />
					<div style={{ height: 20 }} />
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<RaisedButton
							label="Sign Up"
							secondary={true}
							onClick={() => this.props.submitRegistration(this.state.email, this.state.password)}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(
	(state) => ({
		auth: state.auth
	}),
	dispatch => ({
		submitLogin(email, password) {
			dispatch(AuthActions.login(email, password));
		},
		submitRegistration(email, password) {
			dispatch(AuthActions.register(email, password))
		}
	})
)(withRouter(Login));