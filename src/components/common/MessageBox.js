import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Dialog, FlatButton } from 'material-ui';
import { UIActions } from '../../actions';


class MessageBox extends Component {

	static propTypes = {
		open: PropTypes.bool.isRequired,
		title: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired,
		redirect: PropTypes.string,
		scrollable: PropTypes.bool
	}

	static defaultProps = {
		redirect: null,
		scrollable: false
	}

	render() {
		return (
			<Dialog
				// style={{ zIndex: 3000 }}
				title={this.props.title}
				open={this.props.open}
				onRequestClose={() => this.props.handleOK()}
				actions={
					<FlatButton
						label='OK'
						primary={true}
						onClick={this._handleOK.bind(this)}
					/>}
				autoScrollBodyContent={this.props.scrollable}
			>
				<div>
					{this.props.message}
				</div>
			</Dialog>
		)
	}

	_handleOK() {
		this.props.handleOK();
		this.props.redirect ? this.props.history.push(this.props.redirect) : '';
	}

}

export default connect(
	(state) => ({
		...state.ui.messageBox
	}),
	(dispatch, ownProps) => ({
		handleOK(redirect) {
			dispatch(UIActions.hideMessageBox());
		}
	})
)(withRouter(MessageBox))