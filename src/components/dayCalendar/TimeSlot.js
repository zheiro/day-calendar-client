import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from 'material-ui/styles';


export default class TimeSlot extends Component {

	static PropTypes = {
		timeLabel: PropTypes.string,
		style: PropTypes.object,
		labelStyle: PropTypes.object,
		slotStyle: PropTypes.object,
		midSlotStyle: PropTypes.object,
		midSlot: PropTypes.bool
	}

	static defaultProps = {
		time: 0,
		style: {
			display: 'flex',
			height: 45,
			width: 300,
			borderTop: `1px solid ${colors.grey500}`
		},
		labelStyle: {
			width: 50
		},
		slotStyle: {
			width: 250,
		},
		midSlotStyle: {
			display: 'flex',
			height: 45,
			width: 300,
		},
		midSlotLabeStyle: {
			fontSize: 12,
			width: 50
		},
		midSlot: false
	}

	render() {
		return (
			<div>
				<div style={this.props.style}>
					<div style={this.props.labelStyle}>
						{`${this.props.time}:00`}
					</div>
					<div style={this.props.slotStyle} />
				</div>
				{
					this.props.midSlot ?
						<div style={this.props.midSlotStyle}>
							<div style={this.props.midSlotLabeStyle}>
								{`${this.props.time}:30`}
							</div>
							<div style={this.props.slotStyle} />
						</div>
						: null
				}
			</div>
		)
	}
}