import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatButton, Dialog } from 'material-ui';

export default class PromptBox extends Component {

	static propTypes = {
		open: PropTypes.bool.isRequired,
		title: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired,
		action: PropTypes.string.isRequired,
		actionIsPrimary: PropTypes.bool,
		actionStyle: PropTypes.object,
		handleAction: PropTypes.func.isRequired,
		handleCancel: PropTypes.func.isRequired,
	}

	static defaultProps = {
		actionIsPrimary: true,
		actionStyle: {}
	}

	render() {
		let actions =
			[
				<FlatButton
					label="Cancel"
					onClick={this.props.handleCancel.bind(this)}
				/>,
				<FlatButton
					labelStyle={this.props.actionStyle}
					label={this.props.action}
					primary={this.props.actionIsPrimary}
					onClick={this.props.handleAction.bind(this)}
				/>,
			];

		return (
			<Dialog
				title={this.props.title}
				open={this.props.open}
				onRequestClose={this.props.handleCancel.bind(this)}
				actions={actions}
			>
				{this.props.message}
			</Dialog>
		)
	}
}