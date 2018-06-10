import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui';
import { colors } from 'material-ui/styles';


const params = {
	spinnerSize: 60
};

const styles = {
	background: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 2000,
		background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 100%)',
		transition: 'opacity 0.5s ease',
		opacity: 0,
		pointerEvents: 'none'
	},
	backgroundActive: {
		opacity: 1,
		pointerEvents: 'all'
	},
	spinner: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: params.spinnerSize / -2,
		marginLeft: params.spinnerSize / -2
	}
}

class FullScreenSpinner extends Component {

	render() {
		const { active } = this.props;

		return (
			<div style={{ ...styles.background, ...(active ? styles.backgroundActive : {}) }}>
				<CircularProgress
					color={colors.blue400}
					size={params.spinnerSize}
					style={styles.spinner} />
			</div>
		);
	}

}

export default connect(
	state => ({
		active: state.ui.spinner.active
	})
)(FullScreenSpinner);